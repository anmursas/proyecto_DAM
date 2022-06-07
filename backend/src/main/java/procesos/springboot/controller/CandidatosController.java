package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Candidatos;
import procesos.springboot.model.Proceso;
import procesos.springboot.repository.CandidatosRepository;
import procesos.springboot.repository.ProcesoCandidatosReposotory;
import procesos.springboot.model.ProcesoCandidatos;
import procesos.springboot.repository.ProcesoRepository;

import java.util.List;
import java.util.Locale;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/candidatos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CandidatosController {

    @Autowired
    private CandidatosRepository candidatosRepository;

    @Autowired
    private ProcesoRepository procesoRepository;

    @Autowired
    private ProcesoCandidatosReposotory procesoCandidatosReposotory;

    @GetMapping
    public List<Candidatos> getAllCandidatos() {
        return candidatosRepository.findAll();
    }

    @PostMapping
    public Candidatos createCandidato(@RequestBody Candidatos candidatos) {
        Candidatos c = new Candidatos();
        c.setNombre(candidatos.getNombre().toUpperCase(Locale.ROOT));
        c.setApellido1(candidatos.getApellido1().toUpperCase(Locale.ROOT));
        c.setSexo(candidatos.getSexo().toUpperCase(Locale.ROOT));
        return candidatosRepository.save(c);
    }

    @GetMapping("{id}")
    public ResponseEntity<Candidatos> getCandidatosById(@PathVariable Long id) {
        Candidatos candidatos = candidatosRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("candidato not exists with id: " + id));
        return ResponseEntity.ok(candidatos);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Proceso> deleteCandidato(@PathVariable Long id) {

        List<ProcesoCandidatos> pcs = procesoCandidatosReposotory.findAll();

        for (ProcesoCandidatos pc : pcs) {
            if (Objects.equals(pc.getCandidatos().getId(), id)) {
                System.out.println(id);
                procesoCandidatosReposotory.deleteById(pc.getId());
            }

        }

        candidatosRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("No existe candidato con este ID: " + id));
        candidatosRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("{id}")
    public ResponseEntity<Candidatos> updateCandidato(@PathVariable Long id, @RequestBody Candidatos candidatosDetails) {
        Candidatos updatedCandidato = candidatosRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe"));

        updatedCandidato.setNombre(candidatosDetails.getNombre());
        updatedCandidato.setApellido1(candidatosDetails.getApellido1());
        updatedCandidato.setSexo(candidatosDetails.getSexo());

        candidatosRepository.save(updatedCandidato);

        return ResponseEntity.ok(updatedCandidato);
    }


}
