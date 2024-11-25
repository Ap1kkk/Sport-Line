package ru.gorkycode.ngtu.sportline.business.model;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Egor Bokov
 */
public enum UserPermission {
    USER_PERMISSION,
    ADMIN_PERMISSION;

    public Set<UserPermission> fromGrantedAuthorities(Collection<? extends GrantedAuthority> authorities) {
        return authorities
                .stream()
                .map(a -> UserPermission.valueOf(a.getAuthority()))
                .collect(Collectors.toSet());
    }
}
