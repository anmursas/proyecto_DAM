package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.Proceso;
import procesos.springboot.model.PuestoTrabajo;
import procesos.springboot.repository.CentroTrabajoRepository;
import procesos.springboot.repository.PuestoTrabajoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/puesto-trabajo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PuestoTrabajoController {

    @Autowired
    private PuestoTrabajoRepository puestoTrabajoRepository;

    @GetMapping
    public List<PuestoTrabajo> getAllPuestos() {
        return puestoTrabajoRepository.findAll();
    }


    @GetMapping("{id}")
    public ResponseEntity<PuestoTrabajo> getPuestoById(@PathVariable Long id) {
        PuestoTrabajo puestoTrabajo = puestoTrabajoRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("puestoTrabajo not exists with id: " + id));
        return ResponseEntity.ok(puestoTrabajo);
    }

}
