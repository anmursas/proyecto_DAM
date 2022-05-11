package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.PuestoTrabajo;

public interface PuestoTrabajoRepository extends JpaRepository<PuestoTrabajo, Long> {
}
