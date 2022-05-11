package procesos.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import procesos.springboot.model.ERole;
import procesos.springboot.model.Role;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByName(ERole name);

}
