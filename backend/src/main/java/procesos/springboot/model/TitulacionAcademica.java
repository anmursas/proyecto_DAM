package procesos.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "titulacion")
public class TitulacionAcademica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "titu_id", nullable = false)
    private Long id;

    @Column(name = "titu_nombre", nullable = false)
    private String nombre;

    @ManyToMany(
            fetch = FetchType.LAZY,
            mappedBy = "lasTitulaciones"
    )
    @JsonIgnore
    private Set<Proceso> losProcesos;

}
