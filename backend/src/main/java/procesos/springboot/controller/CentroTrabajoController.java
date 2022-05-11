package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Candidatos;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.repository.CentroTrabajoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/centro-trabajo")
@CrossOrigin(origins = {"http://localhost:3000"})
public class CentroTrabajoController {

    @Autowired
    private CentroTrabajoRepository centroTrabajoRepository;

    @GetMapping
    public List<CentroTrabajo> getAllCentroTrabajo() {
        return centroTrabajoRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<CentroTrabajo> getCandidatosById(@PathVariable Long id) {
        CentroTrabajo centroTrabajo = centroTrabajoRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("CentroTrabajo not exists with id: " + id));
        return ResponseEntity.ok(centroTrabajo);
    }
}
