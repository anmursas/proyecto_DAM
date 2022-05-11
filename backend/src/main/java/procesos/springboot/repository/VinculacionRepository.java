package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.Vinculacion;

public interface VinculacionRepository extends JpaRepository<Vinculacion, Long> {
}
