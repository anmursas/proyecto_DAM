package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.Reclutador;
import procesos.springboot.model.TitulacionAcademica;
import procesos.springboot.repository.CentroTrabajoRepository;
import procesos.springboot.repository.TitulacionAcademicaRepository;

import java.util.List;


@RestController
@RequestMapping("/api/v1/titulacion-academica")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TitulacionAcademicaController {

    @Autowired
    private TitulacionAcademicaRepository titulacionAcademicaRepository;

    @GetMapping
    public List<TitulacionAcademica> getAllTitulaciones() {
        return titulacionAcademicaRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<TitulacionAcademica> getTitulacionById(@PathVariable Long id) {
        TitulacionAcademica titulacionAcademica = titulacionAcademicaRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("titulacionAcademica not exists with id: " + id));
        return ResponseEntity.ok(titulacionAcademica);
    }

}
