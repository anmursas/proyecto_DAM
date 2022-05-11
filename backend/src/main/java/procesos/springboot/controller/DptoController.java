package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Contratacion;
import procesos.springboot.model.Dpto;
import procesos.springboot.repository.DptoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dpto")
@CrossOrigin(origins = {"http://localhost:3000"})
public class DptoController {

    @Autowired
    private DptoRepository dptoRepository;

    @GetMapping
    public List<Dpto> getAllDpto() {
        return dptoRepository.findAll();
    }



    @GetMapping("{id}")
    public ResponseEntity<Dpto> getCandidatosById(@PathVariable Long id) {
        Dpto dpto = dptoRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("dpto not exists with id: " + id));
        return ResponseEntity.ok(dpto);
    }

}
