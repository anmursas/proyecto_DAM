package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.PuestoTrabajo;
import procesos.springboot.model.Reclutador;
import procesos.springboot.repository.CentroTrabajoRepository;
import procesos.springboot.repository.ReclutadorRepository;

import java.util.List;


@RestController
@RequestMapping("/api/v1/reclutador")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ReclutadorController {

    @Autowired
    private ReclutadorRepository reclutadorRepository;

    @GetMapping
    public List<Reclutador> getAllReclutadores() {
        return reclutadorRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Reclutador> getProcesoById(@PathVariable Long id) {
        Reclutador reclutador = reclutadorRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("reclutador not exists with id: " + id));
        return ResponseEntity.ok(reclutador);
    }

}

