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
@Table(name = "jornada_laboral")
public class JornadaLaboral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jl_id", nullable = false)
    private Long id;

    @Column(name = "jl_nombre", nullable = false)
    private String nombre;

    @Column(name = "jl_horasemana", nullable = false)
    private Long horaSemanal;

    @OneToMany(mappedBy = "laJornada")
    @JsonIgnore
    private Set<Proceso> losProcesos;

}