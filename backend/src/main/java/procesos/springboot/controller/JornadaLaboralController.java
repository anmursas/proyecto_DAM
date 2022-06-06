package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.Dpto;
import procesos.springboot.model.JornadaLaboral;
import procesos.springboot.repository.CentroTrabajoRepository;
import procesos.springboot.repository.JornadaLaboralRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jornada-laboral")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JornadaLaboralController {

    @Autowired
    private JornadaLaboralRepository jornadaLaboralRepository;

    @GetMapping
    public List<JornadaLaboral> getAllJornadas() {
        return jornadaLaboralRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<JornadaLaboral> getJornadaById(@PathVariable Long id) {
        JornadaLaboral jornadaLaboral = jornadaLaboralRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("jornadaLaboral not exists with id: " + id));
        return ResponseEntity.ok(jornadaLaboral);
    }
}
