package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.JornadaLaboral;

public interface JornadaLaboralRepository extends JpaRepository<JornadaLaboral, Long> {
}
