package procesos.springboot.controller;

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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/proceso")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ProcesoController {

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
    public List<Proceso> getAllProceso() {

        return procesoRepository.findAll();
    }

    @PostMapping
    public Proceso createProceso(@RequestBody Proceso proceso) {
        if (proceso.getProcesoCandidatos().isEmpty()) {
            procesoRepository.save(proceso);
            System.out.println("Empty");
        } else {
            procesoRepository.save(proceso);
            Set<ProcesoCandidatos> losProcesos;
            losProcesos = proceso.getProcesoCandidatos();
            System.out.println(" not Empty");
            for (ProcesoCandidatos pc : losProcesos) {
                ProcesoCandidatos procesoCandidatos = new ProcesoCandidatos();
                procesoCandidatos.setProceso(procesoRepository.findById(proceso.getId()).get());
                procesoCandidatos.setCandidatos(candidatosRepository.findById(pc.getCandidatos().getId()).get());
                procesoCandidatosReposotory.save(procesoCandidatos);
            }
        }
        return proceso;
    }

    @PutMapping("{id}")
    public ResponseEntity<Proceso> updateProceso(@PathVariable Long id, /* El que creamos en el cliente */ @RequestBody Proceso procesoDetails) {

        // El que ya tenemos
        Proceso updatedProceso = procesoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe proceo con ese ID: " + id));

        String[] vinculacion = procesoDetails.getLaVinculacion().toString().split("=");
        long laVinculacion = Long.valueOf(vinculacion[1]);


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
        System.out.println(losCandidatosAntiguos);
        System.out.println(losCandidatosNuevos);

        List<String> candisA = new ArrayList<>();
        for (ProcesoCandidatos pcA : losCandidatosAntiguos) {
            candisA.add(String.valueOf(pcA.getCandidatos().getId()));
        }

        List<String> candisN = new ArrayList<>();
        for (ProcesoCandidatos pcN : losCandidatosNuevos) {
            candisN.add(String.valueOf(pcN.getCandidatos().getId()));
        }


        if (laVinculacion == 1) {
            System.out.println("LABORAL");
            updatedProceso.setLaContratacion(contratacionRepository.findById(procesoDetails.getLaContratacion().getId()).get());
            updatedProceso.setLaVinculacion(vinculacionRepository.findById(laVinculacion).get());

        } else if (laVinculacion == 2) {
            System.out.println("ESTUDIANTE");
            updatedProceso.setLaVinculacion(vinculacionRepository.findById(laVinculacion).get());
            updatedProceso.setLaContratacion(null);
        }

//        if (candisA.equals(candisN)) {
//            System.out.println(losCandidatosAntiguos);
//            System.out.println(losCandidatosNuevos);
//            System.out.println("not changed");
//
//        } else {
//
//            // Borramos las relaciones
//            for (ProcesoCandidatos ls : losCandidatosAntiguos) {
//                if (candisN.contains(ls.getCandidatos().getId())) {
//                    System.out.println("Ya está sdentro");
//                } else {
//                    procesoCandidatosReposotory.deleteById(ls.getId());
//                    System.out.println(ls);
//                }
//
//            }
//
//            // Creamos las nuevas relaciones
//            for (ProcesoCandidatos pc : losCandidatosNuevos) {
//                ProcesoCandidatos procesoCandidatos = new ProcesoCandidatos();
//                procesoCandidatos.setProceso(procesoRepository.findById(updatedProceso.getId()).get());
//                procesoCandidatos.setCandidatos(candidatosRepository.findById(pc.getCandidatos().getId()).get());
//                procesoCandidatosReposotory.save(procesoCandidatos);
//            }
//            updatedProceso.setProcesoCandidatos(losCandidatosNuevos);
//        }
//        System.out.println();

        procesoRepository.save(updatedProceso);


        return ResponseEntity.ok(updatedProceso);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Proceso> deleteProceso(@PathVariable Long id) {
        System.out.println("BORRANDO PROCESO " + id);

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

    // build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Proceso> getProcesoById(@PathVariable Long id) {
        Proceso proceso = procesoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proceso not exists with id: " + id));
        return ResponseEntity.ok(proceso);
    }

    // Get procesos by reclutador
//    @GetMapping("/reclu/{id}")
//    public List<Proceso> getProcesoByReclutador(@PathVariable Long id) {
//        Reclutador r = reclutadorRepository.getById(id);
//        String role = "";
//        for (Role re : r.getRoles()) {
//            role = String.valueOf(re.getName());
//        }
//        List<Proceso> allProcesos = procesoRepository.findAll();
//        List<Proceso> procesosFiltrados = new ArrayList<>();
//
//        if (role == "ROLE_ADMIN") {
//            procesosFiltrados = allProcesos;
//        } else {
//            for (Proceso p : allProcesos) {
//                if (p.getElReclutador().getId() == id) {
//                    procesosFiltrados.add(p);
//                }
//            }
//        }
//
//
//        return procesosFiltrados;
//    }

    @GetMapping("/reclu/{id}")
    public List<Proceso> getAllProceso(@PathVariable Long id) {
//        List<Proceso> losProcesosFiltrados;
//        Reclutador r = reclutadorRepository.getById(id);
//        String role = "";
//        for (Role re : r.getRoles()) {
//            role = String.valueOf(re.getName());
//        }
//
//        if (role == "ROLE_ADMIN") {
//            return procesoRepository.findAll();
//        } else if (role == "ROLE_USER") {
//            return procesoRepository.findByReclu(id);
//        }


        return  procesoRepository.findByReclu(id);
    }

}