package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import procesos.springboot.model.Proceso;

import java.util.List;

@Repository
@Transactional
public interface ProcesoRepository extends JpaRepository<Proceso, Long> {


    // all crud database methods
    @Query(value = "SELECT * FROM proceso where reclu_id = ?1", nativeQuery = true)
    List<Proceso> findByReclu(@Param("id") Long id);
}

