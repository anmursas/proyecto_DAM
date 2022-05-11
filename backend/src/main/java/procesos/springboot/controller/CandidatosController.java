package procesos.springboot.controller;

import org.apache.tomcat.jni.Proc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Candidatos;
import procesos.springboot.model.CentroTrabajo;
import procesos.springboot.model.Proceso;
import procesos.springboot.repository.CandidatosRepository;
import procesos.springboot.repository.ProcesoRepository;

import java.util.List;
import java.util.Locale;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/candidatos")
@CrossOrigin(origins = {"http://localhost:3000"})
public class CandidatosController {

    @Autowired
    private CandidatosRepository candidatosRepository;

    @Autowired
    private ProcesoRepository procesoRepository;

    @GetMapping
    public List<Candidatos> getAllCandidatos() {
        return candidatosRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Candidatos> getCandidatosById(@PathVariable Long id) {
        Candidatos candidatos = candidatosRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("candidato not exists with id: " + id));
        return ResponseEntity.ok(candidatos);
    }

    @PostMapping
    public Candidatos createCandidato(@RequestBody Candidatos candidatos) {
        Candidatos c = new Candidatos();
        c.setNombre(candidatos.getNombre().toUpperCase(Locale.ROOT));
        c.setApellido1(candidatos.getApellido1().toUpperCase(Locale.ROOT));
        c.setSexo(candidatos.getSexo().toUpperCase(Locale.ROOT));
        return candidatosRepository.save(c);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Proceso> deleteCandidato(@PathVariable Long id) {

        System.out.println("BORRANDO CANDIDATO " + id);
        Candidatos candidatos = candidatosRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("No existe candidato con este ID: " + id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
