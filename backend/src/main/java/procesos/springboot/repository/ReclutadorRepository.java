package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import procesos.springboot.model.Reclutador;

import java.util.Optional;

@Repository
public interface ReclutadorRepository extends JpaRepository<Reclutador, Long> {

    Optional<Reclutador> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
