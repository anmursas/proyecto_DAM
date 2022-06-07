package procesos.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Reclutador;
import procesos.springboot.model.Role;
import procesos.springboot.repository.ReclutadorRepository;
import procesos.springboot.security.jwt.JwtUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api/v1/reclutador")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReclutadorController {

    @Autowired
    private ReclutadorRepository reclutadorRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<Reclutador> getAllReclutadores() {
        return reclutadorRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Reclutador> getUserById(@PathVariable Long id) {
        Reclutador reclutador = reclutadorRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("reclutador not exists with id: " + id));
        return ResponseEntity.ok(reclutador);
    }

    @GetMapping("/validate")
    public Boolean isAdmin(HttpServletRequest request) {

        boolean admin = false;
        String jwtToken = request.getHeader("Authorization");
        if (jwtToken == null) {
            admin = false;
        } else {
            String[] token = jwtToken.split(" ");
            Reclutador r = reclutadorRepository.findByUsername((jwtUtils.getUserNameFromJwtToken(token[1]))).get();
            Set<Role> str = r.getRoles();
            for (Role role : str) {
                if (role.getName().toString() == "ROLE_ADMIN") {
                    admin = true;
                } else if (role.getName().toString() == "ROLE_USER") {
                    admin = false;
                }
            }
        }
        return admin;
    }

    @GetMapping("/get-id")
    public Long getIdFromToken(HttpServletRequest request) {
        String jwtToken = request.getHeader("Authorization");
        String[] token = jwtToken.split(" ");
        return reclutadorRepository.findByUsername((jwtUtils.getUserNameFromJwtToken(token[1]))).get().getId();
    }

    @GetMapping("/byid")
    public Reclutador getRecluFromRequest(HttpServletRequest request) {
        Reclutador r = new Reclutador();
        String user = request.getRemoteUser();
        if (!(user == null)) {
            r = reclutadorRepository.findByUsername(user).get();
        } else {
        }
        return r;
    }

}

