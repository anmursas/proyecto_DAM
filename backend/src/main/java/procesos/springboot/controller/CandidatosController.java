package procesos.springboot.controller;

import org.apache.tomcat.jni.Local;
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

        updatedCandidato.setNombre(candidatosDetails.getNombre().toUpperCase(Locale.ROOT));
        updatedCandidato.setApellido1(candidatosDetails.getApellido1().toUpperCase(Locale.ROOT));
        updatedCandidato.setSexo(candidatosDetails.getSexo());

        candidatosRepository.save(updatedCandidato);

        return ResponseEntity.ok(updatedCandidato);
    }

    @PostMapping("/createNews")
    public String creatingCandidatos() {
        String candis = "Erda,Hampstead,F\n" +
                "Bobby,Spelling,F\n" +
                "Hildagard,Done,F\n" +
                "Amandy,Ellick,F\n" +
                "Lari,Trudgion,F\n" +
                "Ravid,Perrie,M\n" +
                "Lalo,Lowther,M\n" +
                "Desirae,Habbershon,F\n" +
                "Christye,Lots,F\n" +
                "Sherwynd,Lithcow,M\n" +
                "Dacy,Layzell,F\n" +
                "Lodovico,McGroarty,M\n" +
                "Tara,Phizackarley,F\n" +
                "Bethena,Enbury,F\n" +
                "Stefano,Capron,M\n" +
                "Ardeen,Pethybridge,F\n" +
                "Claire,Iddon,M\n" +
                "Ewan,Dronsfield,M\n" +
                "Kalle,Botly,M\n" +
                "Lew,Cawdron,M\n" +
                "Elysee,McOmish,F\n" +
                "Alexio,Elcum,M\n" +
                "Merrill,Brookzie,M\n" +
                "Griffin,Hynde,M\n" +
                "Nolie,Delucia,F\n" +
                "Clerc,Kingdom,M\n" +
                "Angelina,Dryden,F\n" +
                "Udall,Morrall,M\n" +
                "Britta,Maletratt,F\n" +
                "Pete,Paice,M\n" +
                "Shep,Goldbourn,M\n" +
                "Annmarie,Bond,F\n" +
                "Artemas,Maxfield,M\n" +
                "Ware,Rickerby,M\n" +
                "Natal,Pirozzi,M\n" +
                "Axel,Roistone,M\n" +
                "Lazarus,Rawles,M\n" +
                "Lorry,Mc Pake,F\n" +
                "Robinson,Spenclay,M\n" +
                "Nickie,Teale,M\n" +
                "Adan,Widd,M\n" +
                "Hilton,Normanvill,M\n" +
                "Lawry,Dimond,M\n" +
                "Lorenzo,Catt,M\n" +
                "Lucien,Fessions,M\n" +
                "Mina,Blackbrough,F\n" +
                "Ara,Leverich,M\n" +
                "Di,Colleer,F\n" +
                "Daniela,Dearing,F\n" +
                "Jerrold,Stenton,M\n" +
                "Seamus,Uren,M\n" +
                "Belva,Hirthe,F\n" +
                "Pansy,MacKenny,F\n" +
                "Minni,Paskerful,F\n" +
                "Theo,Jakuszewski,M\n" +
                "Humfrey,Garmans,M\n" +
                "Ignaz,Breukelman,M\n" +
                "Hillier,Farnell,M\n" +
                "Phil,Witherdon,M\n" +
                "Ralph,Ellson,M\n" +
                "Rivkah,Makiver,F\n" +
                "Onfroi,Bourchier,M\n" +
                "Claretta,Carlick,F\n" +
                "Maureene,Champken,F\n" +
                "Diana,Trowler,F\n" +
                "Bartolomeo,Venables,M\n" +
                "Dorthea,Jellard,F\n" +
                "Antonie,Scamp,F\n" +
                "Gloriana,Maplethorpe,F\n" +
                "Wilton,Giacomazzo,M\n" +
                "Celeste,Robillart,F\n" +
                "Seymour,Lornsen,M\n" +
                "Mathe,Borgnol,M\n" +
                "Madalena,Duggan,F\n" +
                "Lily,Symmers,F\n";

        String[] candi = candis.split("\n");
        System.out.println(candi[1]);

        for (int i = 0; i < candi.length; i++) {
            String nombre;
            String ape;
            String sexo;
            String[] nombres = candi[i].split(",");
            nombre = nombres[0];
            ape = nombres[1];
            sexo = nombres[2];

            System.out.println("NOMBRE: " + nombre + " APELLIDOS: " + ape + " SEXO: " + sexo);

            Candidatos c = new Candidatos(nombre.toUpperCase(Locale.ROOT), ape.toUpperCase(Locale.ROOT), sexo.toUpperCase(Locale.ROOT));

            candidatosRepository.save(c);
            nombre = "";
            ape = "";
            sexo = "";
            c = null;
        }


        return candis;
    }


}
