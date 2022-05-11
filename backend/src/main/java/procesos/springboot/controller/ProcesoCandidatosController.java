package procesos.springboot.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.ProcesoCandidatos;
import procesos.springboot.repository.ProcesoCandidatosReposotory;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pro_cand")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ProcesoCandidatosController {

    @Autowired
    private ProcesoCandidatosReposotory procesoCandidatosReposotory;

    @GetMapping
    public List<ProcesoCandidatos> getAllProcesoCandidatos() {
        return procesoCandidatosReposotory.findAll();
    }

    @PostMapping
    public ProcesoCandidatos createProcesoCandidatos(@RequestBody ProcesoCandidatos procesoCandidatos) {
        return procesoCandidatosReposotory.save(procesoCandidatos);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ProcesoCandidatos> deleteprocesoCandidatos(@PathVariable Long id) {
        ProcesoCandidatos procesoCandidatos = procesoCandidatosReposotory.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("No existe una relacion con este ID: " + id));

        procesoCandidatosReposotory.delete(procesoCandidatos);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProcesoCandidatos> updateProcesoCandidatos(@PathVariable Long id, @RequestBody ProcesoCandidatos procesoCandidatosDetails) {

        ProcesoCandidatos updatedProcesoCandidatos = procesoCandidatosReposotory.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe"));

        updatedProcesoCandidatos.setEntrevistado(procesoCandidatosDetails.getEntrevistado());

        procesoCandidatosReposotory.save(updatedProcesoCandidatos);
        return ResponseEntity.ok(updatedProcesoCandidatos);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProcesoCandidatos> getProcesoCandidatosById(@PathVariable Long id) {
        ProcesoCandidatos procesoCandidatos = procesoCandidatosReposotory.findById(id).orElseThrow(() -> new ResourceNotFoundException("No"));
        return ResponseEntity.ok(procesoCandidatos);
    }

//    @DeleteMapping()
//    public ResponseEntity<ProcesoCandidatos> deleteByValues(@RequestBody Long id, @RequestBody Long cand_id) {
//        procesoCandidatosReposotory.deleteByIds(id,cand_id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }


}
