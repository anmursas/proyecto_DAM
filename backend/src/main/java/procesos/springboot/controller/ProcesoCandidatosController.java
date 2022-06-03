package procesos.springboot.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Proceso;
import procesos.springboot.repository.*;

import procesos.springboot.model.ProcesoCandidatos;
import procesos.springboot.model.Reclutador;
import procesos.springboot.model.Role;
import procesos.springboot.repository.ProcesoCandidatosReposotory;
import procesos.springboot.repository.ReclutadorRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/pro_cand")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProcesoCandidatosController {

    @Autowired
    private ProcesoCandidatosReposotory procesoCandidatosReposotory;

    @Autowired
    private ReclutadorRepository reclutadorRepository;

    @Autowired
    private ProcesoRepository procesoRepository;

    @GetMapping
    // @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<ProcesoCandidatos> getAllProcesoCandidatos() {
        return procesoCandidatosReposotory.findAll();
    }

    @PostMapping
    public ProcesoCandidatos createProcesoCandidatos(@RequestBody ProcesoCandidatos procesoCandidatos, HttpServletRequest request) {
        String user = request.getRemoteUser();
        Reclutador r = reclutadorRepository.findByUsername(user).get();
        Set<Role> roles = r.getRoles();
        String rol = null;

        for (Role rs : roles) {
            rol = String.valueOf(rs.getName());
        }
        Proceso p = procesoRepository.findById(procesoCandidatos.getProceso().getId()).get();
        String userPC = p.getElReclutador().getUsername();

        if (!Objects.equals(userPC, user)) {
            if (rol == "ROLE_ADMIN") {
                return procesoCandidatosReposotory.save(procesoCandidatos);
            }
            return null;
        } else if (Objects.equals(userPC, user)) {

            return procesoCandidatosReposotory.save(procesoCandidatos);
        }
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
        updatedProcesoCandidatos.setMotivo(procesoCandidatosDetails.getMotivo());
        updatedProcesoCandidatos.setFechaE(procesoCandidatosDetails.getFechaE());

        procesoCandidatosReposotory.save(updatedProcesoCandidatos);

        return ResponseEntity.ok(updatedProcesoCandidatos);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProcesoCandidatos> getProcesoCandidatosById(@PathVariable Long id) {
        ProcesoCandidatos procesoCandidatos = procesoCandidatosReposotory.findById(id).orElseThrow(() -> new ResourceNotFoundException("No"));
        return ResponseEntity.ok(procesoCandidatos);
    }


}
