package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.Contratacion;

public interface ContratacionRepository extends JpaRepository<Contratacion,Long> {
}
