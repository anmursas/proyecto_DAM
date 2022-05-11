package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import procesos.springboot.model.ProcesoCandidatos;

public interface ProcesoCandidatosReposotory extends JpaRepository<ProcesoCandidatos, Long> {

    @Modifying
    @Query("Delete from ProcesoCandidatos where proceso_id=(:ids) and cand_id=(:cand)")
    int deleteByIds(@Param("ids") Long id, @Param("cand") Long cand);
}
