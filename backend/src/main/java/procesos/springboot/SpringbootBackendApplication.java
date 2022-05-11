package procesos.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import procesos.springboot.model.*;
import procesos.springboot.repository.*;

import java.sql.Date;
import java.util.List;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }

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

    @Override
    public void run(String... args) throws Exception {
//
//        CentroTrabajo ct = new CentroTrabajo();
//        ct.setSiglas("MAD");
//        ct.setNombre("Madrid");
//        centroTrabajoRepository.save(ct);
//
//        Candidatos candidatos = new Candidatos();
//        candidatos.setNombre("Paco");
//        candidatos.setApellido1("Vila");
//        candidatos.setSexo("M");
//        candidatosRepository.save(candidatos);
//
//        Contratacion contratacion = new Contratacion();
//        contratacion.setNombre("Practicas");
//        contratacion.setCodigo("420");
//        contratacionRepository.save(contratacion);
//
//        Dpto dpto = new Dpto();
//        dpto.setNombre("Informatica");
//        dpto.setSiglas("INF");
//        dptoRepository.save(dpto);
//
//        JornadaLaboral jl = new JornadaLaboral();
//        jl.setNombre("Full");
//        jl.setHoraSemanal(36L);
//        jornadaLaboralRepository.save(jl);
//
//        PuestoTrabajo pt = new PuestoTrabajo();
//        pt.setNombre("Tecnico");
//        puestoTrabajoRepository.save(pt);
//
//        Reclutador re = new Reclutador();
//        re.setNombre("Jose");
//        reclutadorRepository.save(re);
//
//        TitulacionAcademica ta = new TitulacionAcademica();
//        ta.setNombre("Ingeniero");
//        titulacionAcademicaRepository.save(ta);
//
//
//        Vinculacion vinc = new Vinculacion();
//        vinc.setNombre("Estudiante");
//        vinculacionRepository.save(vinc);
//
//
//        System.out.println("######" + procesoRepository.findAll());
//
//        Proceso proceso = new Proceso();
//        proceso.setDpto_id(1L);
//        proceso.setCt_id(1L);
//        proceso.setReclu_id(1L);
//        proceso.setFechaFin(Date.valueOf("1999-03-10"));
//        proceso.setFechaInicio(Date.valueOf("1997-03-10"));
//        proceso.setVinc_id(1L);
//        proceso.setPuesto_id(1L);
//        proceso.setTc_id(1L);
//        proceso.setJl_id(1L);
//        proceso.setRequisitos("Ana María Ana María ma dejao y Rosalía Rosalía no me quieree");


        // Solve
//        proceso.addCandidatos(candidatosRepository.getById(1L));
//        proceso.addTitulaciones(titulacionAcademicaRepository.getById(1L));


        //procesoRepository.save(proceso);
//        Proceso p = new Proceso();
//        p.setDpto_id(1L);
//        p.setCt_id(1L);
//        p.setReclu_id(1L);
//        p.setFechaFin(Date.valueOf("1999-03-10"));
//        p.setFechaInicio(Date.valueOf("1997-03-10"));
//        p.setVinc_id(1L);
//        p.setPuesto_id(1L);
//        p.setTc_id(1L);
//        p.setJl_id(1L);
//        p.setRequisitos("Ana María Ana María ma dejao y Rosalía Rosalía no me quieree");
//        System.out.println("=======================" + p.toString());
//        procesoRepository.save(p);

/*        Proceso proceso = new Proceso();
        proceso.setElDepartamento(dptoRepository.getById(1L));
        proceso.setElCentroTrabajo(centroTrabajoRepository.getById(2L));
        proceso.setElReclutador(reclutadorRepository.getById(1L));
        proceso.setFechaFin(Date.valueOf("1999-03-10"));
        proceso.setFechaInicio(Date.valueOf("1997-03-10"));
        proceso.setLaVinculacion(vinculacionRepository.getById(1L));
        proceso.setElPuesto(puestoTrabajoRepository.getById(2L));
        proceso.setLaContratacion(contratacionRepository.getById(2L));
        proceso.setLaJornada(jornadaLaboralRepository.getById(1L));
        proceso.setRequisitos("Ana María Ana María ma dejao y Rosalía Rosalía no me quieree");
        procesoRepository.save(proceso);*/
        /*List<Proceso> procesos = procesoRepository.findAll();

        System.out.println(procesos);*/

        /*ProcesoCandidatos procesoCandidatos = new ProcesoCandidatos();
        procesoCandidatos.setProceso(procesoRepository.findById(29L).get());
        procesoCandidatos.setCandidatos(candidatosRepository.findById(1L).get());
        procesoCandidatos.setEntrevistado(false);

        procesoCandidatosReposotory.save(procesoCandidatos);*/


    }
}
