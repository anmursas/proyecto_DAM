package procesos.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "proceso_candidatos")
public class ProcesoCandidatos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pro_cand_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cand_id")
    @JsonIgnoreProperties("procesoCandidatos")
    private Candidatos candidatos;

    @ManyToOne
    @JoinColumn(name = "proceso_id")
    @JsonIgnoreProperties("procesoCandidatos")
    private Proceso proceso;

    @Column(name = "entrevistado", nullable = true)
    @Enumerated(EnumType.STRING)
    private UserSelectionENUM entrevistado;

    public enum UserSelectionENUM {SÍ, NO, NO_ENTREVISTADO}




}
