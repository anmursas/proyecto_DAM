package procesos.springboot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.TitulacionAcademica;
import procesos.springboot.model.Vinculacion;
import procesos.springboot.repository.CentroTrabajoRepository;
import procesos.springboot.repository.VinculacionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vinculacion")
@CrossOrigin(origins = "*", maxAge = 3600)
public class VinculacionController {

    @Autowired
    private VinculacionRepository vinculacionRepository;

    @GetMapping
    // @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Vinculacion> getAllVinculacion() {
        return vinculacionRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Vinculacion> getProcesoById(@PathVariable Long id) {
        Vinculacion vinculacion = vinculacionRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("vinculacion not exists with id: " + id));
        return ResponseEntity.ok(vinculacion);
    }

}
