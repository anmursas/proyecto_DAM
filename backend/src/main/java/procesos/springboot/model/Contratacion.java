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
@Table(name = "tipo_contratacion")
public class Contratacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tc_id", nullable = false)
    private Long id;

    @Column(name = "tc_nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "laContratacion")
    @JsonIgnore
    private Set<Proceso> losProcesos;

}
