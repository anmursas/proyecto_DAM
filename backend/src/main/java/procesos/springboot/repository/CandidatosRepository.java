package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import procesos.springboot.model.Candidatos;

public interface CandidatosRepository extends JpaRepository<Candidatos, Long> {
}
