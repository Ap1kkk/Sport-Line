package ru.gorkycode.ngtu.sportline.business.system.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.Collection;

/**
 * @author Egor Bokov
 */
public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String password;

    public CustomUserDetails(User userCredential) {
        this.username = userCredential.getUsername();
        this.password = userCredential.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
}