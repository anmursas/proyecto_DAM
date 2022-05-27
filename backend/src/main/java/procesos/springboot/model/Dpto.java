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
@Table(name = "departamento")
public class Dpto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dpto_id", nullable = false)
    private Long id;

    @Column(name = "dpto_nombre", nullable = false)
    private String nombre;

    @Column(name = "dpto_siglas", nullable = false)
    private String siglas;

    @OneToMany(mappedBy = "elDepartamento", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Proceso> losProcesos;

    public Dpto(String nombre, String siglas) {
        this.nombre = nombre;
        this.siglas = siglas;
    }
}
