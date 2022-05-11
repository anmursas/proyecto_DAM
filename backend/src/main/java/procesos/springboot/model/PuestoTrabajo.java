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
@Table(name = "puestos")
public class PuestoTrabajo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "puesto_id", nullable = false)
    private Long id;

    @Column(name = "puesto_nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "elPuesto")
    @JsonIgnore
    private Set<Proceso> losProcesos;

    @Column(name = "puesto_hombres")
    private Long hombres;

    @Column(name = "puesto_mujeres")
    private Long mujeres;


}
