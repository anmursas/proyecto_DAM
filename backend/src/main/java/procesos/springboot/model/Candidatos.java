package procesos.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import net.bytebuddy.implementation.bind.annotation.DefaultMethod;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "candidatos")
public class Candidatos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cand_id", nullable = false)
    private Long id;

    @Column(name = "cand_nombre", nullable = false)
    private String nombre;

    @Column(name = "cand_ape1", nullable = false)
    private String apellido1;

    @Column(name = "cand_sexo", nullable = false)
    private String sexo;

    @OneToMany(mappedBy = "candidatos")
    private Set<ProcesoCandidatos> procesoCandidatos = new HashSet<ProcesoCandidatos>();

    public Candidatos(String nombre, String ape, String sexo) {
        this.nombre = nombre;
        this.apellido1 = ape;
        this.sexo = sexo;
    }
}
