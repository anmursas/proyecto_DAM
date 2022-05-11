package procesos.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reclutador",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class Reclutador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reclu_id", nullable = false)
    private Long id;

    @Column(name = "reclu_nombre", nullable = false)
    private String nombre;

    @Column(name = "reclu_apellido", nullable = false)
    private String apellidos;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    @OneToMany(mappedBy = "elReclutador")
    @JsonIgnore
    private Set<Proceso> losProcesos;

    public Reclutador(String nombre, String apellidos, String username, String email, String password) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
