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
@Table(name = "vinculacion")
public class Vinculacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vinc_id", nullable = false)
    private Long id;

    @Column(name = "vinc_nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "laVinculacion")
    @JsonIgnore
    private Set<Proceso> losProcesos;

    @Override
    public String toString() {
        return "id=" + id;

    }
}
