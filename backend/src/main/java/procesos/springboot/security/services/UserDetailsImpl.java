package procesos.springboot.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import procesos.springboot.model.Reclutador;
import procesos.springboot.model.Role;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String nombre;
    private String apellidos;
    private String username;
    private String email;
    @JsonIgnore
    private String password;

    private Set<Role> roles;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String nombre, String apellidos, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities, Set<Role> roles) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.roles = roles;
    }

    public static UserDetailsImpl build(Reclutador reclutador) {
        List<GrantedAuthority> authorities = reclutador.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                reclutador.getId(),
                reclutador.getNombre(),
                reclutador.getApellidos(),
                reclutador.getUsername(),
                reclutador.getEmail(),
                reclutador.getPassword(),
                authorities,
                reclutador.getRoles()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    public String getRoles() {
        String out = "";
        for (Role r : roles) {
            out = r.getName().name();
        }
        return out;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
