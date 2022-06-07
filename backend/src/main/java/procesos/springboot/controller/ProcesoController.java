package procesos.springboot.controller;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import procesos.springboot.exception.ResourceNotFoundException;
import procesos.springboot.model.Proceso;
import procesos.springboot.model.ProcesoCandidatos;
import procesos.springboot.model.Reclutador;
import procesos.springboot.model.Role;
import procesos.springboot.repository.*;
import procesos.springboot.security.jwt.JwtUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/v1/proceso")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProcesoController {

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private CandidatosRepository candidatosRepository;

    @Autowired
    private CentroTrabajoRepository centroTrabajoRepository;

    @Autowired
    private ContratacionRepository contratacionRepository;

    @Autowired
    private DptoRepository dptoRepository;

    @Autowired
    private JornadaLaboralRepository jornadaLaboralRepository;

    @Autowired
    private ProcesoRepository procesoRepository;

    @Autowired
    private PuestoTrabajoRepository puestoTrabajoRepository;

    @Autowired
    private ReclutadorRepository reclutadorRepository;

    @Autowired
    private TitulacionAcademicaRepository titulacionAcademicaRepository;

    @Autowired
    private VinculacionRepository vinculacionRepository;

    @Autowired
    private ProcesoCandidatosReposotory procesoCandidatosReposotory;

    @GetMapping
    public List<Proceso> getAllProceso(@NotNull HttpServletRequest request) {
        String user = request.getRemoteUser();
        if (!(user == null)) {
            Reclutador r = reclutadorRepository.findByUsername(user).get();
            Set<Role> s = r.getRoles();
            for (Role ro : s) {
                if (ro.getName().toString() == "ROLE_ADMIN") {
                    return procesoRepository.findAll();
                } else {
                    return procesoRepository.findByReclu(r.getId());
                }
            }
        } else {
        }
        return null;
    }

    @GetMapping("{id}")
    public ResponseEntity<Proceso> getProcesoById(@PathVariable Long id, HttpServletRequest request) {
        String user = request.getRemoteUser();
        Reclutador r = reclutadorRepository.findByUsername(user).get();
        Set<Role> roles = r.getRoles();
        String rol = null;
        Proceso p = new Proceso();

        for (Role rs : roles) {
            rol = String.valueOf(rs.getName());
        }


        Proceso proceso = procesoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proceso not exists with id: " + id));
        if (!Objects.equals(proceso.getElReclutador().getUsername(), user)) {
            if (rol == "ROLE_ADMIN") {
                return ResponseEntity.ok(proceso);
            }
            return null;
        } else if ((Objects.equals(proceso.getElReclutador().getUsername(), user))) {
            return ResponseEntity.ok(proceso);
        } else {
            return null;
        }
    }


    @PostMapping
    public Proceso createProceso(@RequestBody Proceso proceso) {
        if (proceso.getProcesoCandidatos().isEmpty()) {
            procesoRepository.save(proceso);
        } else {
            procesoRepository.save(proceso);
            Set<ProcesoCandidatos> losProcesos;
            losProcesos = proceso.getProcesoCandidatos();
            for (ProcesoCandidatos pc : losProcesos) {
                ProcesoCandidatos procesoCandidatos = new ProcesoCandidatos();
                procesoCandidatos.setProceso(procesoRepository.findById(proceso.getId()).get());
                procesoCandidatos.setCandidatos(candidatosRepository.findById(pc.getCandidatos().getId()).get());
                procesoCandidatos.setMotivo("");
                procesoCandidatos.setEntrevistado(ProcesoCandidatos.UserSelectionENUM.NO_ENTREVISTADO);
                procesoCandidatos.setFechaE(null);
                procesoCandidatosReposotory.save(procesoCandidatos);
            }
        }
        return proceso;
    }

    @PostMapping("/date")
    public List<Proceso> findByDate(@RequestBody String dates) throws ParseException {
        List<Proceso> procesosFiltrados = new ArrayList<Proceso>();
        if (dates.isEmpty()) {

        } else {
            System.out.println(dates);

            String[] splitted = dates.split("\"");

            for (int i = 0; i < splitted.length; i++) {
                System.out.println(splitted[i]);
            }

            String f1 = splitted[3];
            String f2 = splitted[7];
            String[] temp1 = f1.split("T");
            String[] temp2 = f2.split("T");
            String fecha1 = temp1[0];
            String fecha2 = temp2[0];


            Date date1 = Date.valueOf(fecha1);
            Date date2 = Date.valueOf(fecha2);

            for (Proceso p : procesoRepository.findAll()) {
                if (!(p.getFechaInicio().before(date1) && p.getFechaFin().before(date1))) {
                    if (!(p.getFechaInicio().after(date2) && p.getFechaFin().after(date2))) {
                        procesosFiltrados.add(p);
                    }
                    ;
                }
            }
        }

        return procesosFiltrados;
    }


    @PutMapping("{id}")
    public ResponseEntity<Proceso> updateProceso(@PathVariable Long id, /* El que creamos en el cliente */ @RequestBody Proceso procesoDetails, HttpServletRequest request) {

        // El que ya tenemos
        Proceso updatedProceso = procesoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe proceo con ese ID: " + id));

        String[] vinculacion = procesoDetails.getLaVinculacion().toString().split("=");
        long laVinculacion = Long.parseLong(vinculacion[1]);


        updatedProceso.setElDepartamento(dptoRepository.findById(procesoDetails.getElDepartamento().getId()).get());
        updatedProceso.setElCentroTrabajo(centroTrabajoRepository.findById(procesoDetails.getElCentroTrabajo().getId()).get());
        updatedProceso.setElReclutador(reclutadorRepository.findById(procesoDetails.getElReclutador().getId()).get());
        updatedProceso.setFechaInicio(procesoDetails.getFechaInicio());
        updatedProceso.setFechaFin(procesoDetails.getFechaFin());
        updatedProceso.setElPuesto(puestoTrabajoRepository.findById(procesoDetails.getElPuesto().getId()).get());
        updatedProceso.setLaJornada(jornadaLaboralRepository.findById(procesoDetails.getLaJornada().getId()).get());
        updatedProceso.setLasTitulaciones(procesoDetails.getLasTitulaciones());
        updatedProceso.setRequisitos(procesoDetails.getRequisitos());

        Set<ProcesoCandidatos> losCandidatosAntiguos = updatedProceso.getProcesoCandidatos();
        Set<ProcesoCandidatos> losCandidatosNuevos = procesoDetails.getProcesoCandidatos();


        List<String> candisA = new ArrayList<>();
        for (ProcesoCandidatos pcA : losCandidatosAntiguos) {
            candisA.add(String.valueOf(pcA.getCandidatos().getId()));
        }

        List<String> candisN = new ArrayList<>();
        for (ProcesoCandidatos pcN : losCandidatosNuevos) {
            candisN.add(String.valueOf(pcN.getCandidatos().getId()));
        }


        if (laVinculacion == 1) {
            updatedProceso.setLaContratacion(contratacionRepository.findById(procesoDetails.getLaContratacion().getId()).get());
            updatedProceso.setLaVinculacion(vinculacionRepository.findById(laVinculacion).get());

        } else if (laVinculacion == 2) {
            updatedProceso.setLaVinculacion(vinculacionRepository.findById(laVinculacion).get());
            updatedProceso.setLaContratacion(null);
        }


        procesoRepository.save(updatedProceso);


        return ResponseEntity.ok(updatedProceso);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Proceso> deleteProceso(@PathVariable Long id) {

        List<ProcesoCandidatos> procesoCandidatos = procesoCandidatosReposotory.findAll();

        for (ProcesoCandidatos pc : procesoCandidatos) {
            if (pc.getProceso().getId().equals(id)) {
                procesoCandidatosReposotory.delete(pc);
            }
        }

        Proceso proceso = procesoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe proceso con este ID: " + id));
        procesoRepository.delete(proceso);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/reclu/{id}")
    public List<Proceso> getAllProceso(@PathVariable Long id) {

        return procesoRepository.findByReclu(id);
    }

    @GetMapping("/dpto/{id}")
    public Long getCandidatasByDpto(@PathVariable Long id) {
        Long mujeres = 0L;
        Long hombres = 0L;
        Long porcentaje = 0L;

        List<Proceso> procesos = procesoRepository.findAll();

        for (Proceso p : procesos) {
            if (p.getElDepartamento().getId().equals(id)) {
                Set<ProcesoCandidatos> procesoCandidatos = p.getProcesoCandidatos();
                for (ProcesoCandidatos pc : procesoCandidatos) {
                    if (pc.getCandidatos().getSexo().toString().equals("F")) {
                        mujeres++;
                    }

                    if (pc.getCandidatos().getSexo().toString().equals("M")) {
                        hombres++;
                    }
                }
            }
        }
        if (mujeres > 0) {
            porcentaje = (mujeres * 100) / (hombres + mujeres);
        }
        return porcentaje;
    }

    @GetMapping("/dpto-s/{id}")
    public Long getSeleccionadasByDpto(@PathVariable Long id) {
        Long mujeres = 0L;
        Long hombres = 0L;
        Long porcentaje = 0L;

        List<Proceso> procesos = procesoRepository.findAll();

        for (Proceso p : procesos) {
            if (p.getElDepartamento().getId().equals(id)) {
                for (ProcesoCandidatos pc : p.getProcesoCandidatos()) {
                    if (pc.getCandidatos().getSexo().toString().equals("F") && pc.getEntrevistado().toString().equals("SI")) {
                        System.out.println(pc.getEntrevistado());
                        mujeres++;
                    }

                    if (pc.getCandidatos().getSexo().toString().equals("M") && pc.getEntrevistado().toString().equals("SI")) {
                        hombres++;
                    }
                }
            }
        }
        if (mujeres > 0) {
            porcentaje = (mujeres * 100) / (hombres + mujeres);
        }
        return porcentaje;
    }


}