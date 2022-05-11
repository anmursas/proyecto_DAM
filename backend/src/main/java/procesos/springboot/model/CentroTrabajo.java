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
@Table(name = "centro_trabajo")
public class CentroTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ct_id", nullable = false)
    private Long id;

    @Column(name = "ct_nombre", nullable = false)
    private String nombre;

    @Column(name = "ct_siglas", nullable = false)
    private String siglas;

    @OneToMany(mappedBy = "elCentroTrabajo")
    @JsonIgnore
    private Set<Proceso> losProcesos;

}
