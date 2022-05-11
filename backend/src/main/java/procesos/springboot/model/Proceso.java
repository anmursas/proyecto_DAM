package procesos.springboot.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "proceso")
public class Proceso {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proceso_id", nullable = false)
    private Long id;

    @Transient
    @Column(name = "pro_cod")
    private String pro_cod;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "dpto_id", nullable = false)
    private Dpto elDepartamento;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "ct_id", nullable = false)
    private CentroTrabajo elCentroTrabajo;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "reclu_id", nullable = false)
    private Reclutador elReclutador;

    @Column(name = "f_inicio", nullable = false)
    private Date fechaInicio;

    @Column(name = "f_fin", nullable = false)
    private Date fechaFin;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "vinc_id", nullable = false)
    private Vinculacion laVinculacion;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "puesto_id", nullable = false)
    private PuestoTrabajo elPuesto;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "tc_id", nullable = true)
    private Contratacion laContratacion;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "jl_id", nullable = false)
    private JornadaLaboral laJornada;

    @Column(name = "requisitos")
    private String Requisitos;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "proceso_titulacion", joinColumns = @JoinColumn(name = "proceso_id", referencedColumnName = "proceso_id"), inverseJoinColumns = @JoinColumn(name = "titu_id", referencedColumnName = "titu_id"))
    private Set<TitulacionAcademica> lasTitulaciones;

    @OneToMany(mappedBy = "proceso")
    private Set<ProcesoCandidatos> procesoCandidatos;

    public Proceso() {
        this.lasTitulaciones = new HashSet<>();
        this.procesoCandidatos = new HashSet<>();
    }

    @PostLoad
    private void postLoad() {
        String temp = elDepartamento.getSiglas() + elCentroTrabajo.getSiglas();
        Long num = 0L;
        this.pro_cod = elDepartamento.getSiglas() + elCentroTrabajo.getSiglas() + id;
    }

    @Override
    public String toString() {
        return "Proceso{" +
                "id=" + id +
                ", pro_cod='" + pro_cod + '\'' +
                ", elDepartamento=" + elDepartamento +
                ", elCentroTrabajo=" + elCentroTrabajo +
                ", elReclutador=" + elReclutador +
                ", fechaInicio=" + fechaInicio +
                ", fechaFin=" + fechaFin +
                ", laVinculacion=" + laVinculacion +
                ", elPuesto=" + elPuesto +
                ", laContratacion=" + laContratacion +
                ", laJornada=" + laJornada +
                ", Requisitos='" + Requisitos + '\'' +
                ", lasTitulaciones=" + lasTitulaciones +
                '}';
    }
}
