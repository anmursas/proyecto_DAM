package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.CentroTrabajo;

public interface CentroTrabajoRepository extends JpaRepository<CentroTrabajo,Long> {
}
