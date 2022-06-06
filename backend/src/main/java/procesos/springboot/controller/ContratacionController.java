package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.Contratacion;
import procesos.springboot.repository.CentroTrabajoRepository;
import procesos.springboot.repository.ContratacionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contratacion")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ContratacionController {

    @Autowired
    private ContratacionRepository contratacionRepository;

    @GetMapping
    public List<Contratacion> getAllContrataciones() {
        return contratacionRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Contratacion> getContratacionById(@PathVariable Long id) {
        Contratacion contratacion = contratacionRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Contratacion not exists with id: " + id));
        return ResponseEntity.ok(contratacion);
    }
}
