package procesos.springboot.repository;

import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.Dpto;

public interface DptoRepository extends JpaRepository<Dpto, Long> {


}
