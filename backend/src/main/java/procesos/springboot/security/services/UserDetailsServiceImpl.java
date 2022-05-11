package procesos.springboot.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import procesos.springboot.model.Reclutador;
import procesos.springboot.repository.ReclutadorRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    ReclutadorRepository reclutadorRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Reclutador reclutador = reclutadorRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return UserDetailsImpl.build(reclutador);
    }
}
