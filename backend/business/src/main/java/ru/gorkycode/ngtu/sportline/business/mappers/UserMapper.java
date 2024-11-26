package ru.gorkycode.ngtu.sportline.business.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.model.User;

import java.time.ZonedDateTime;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public User map(CreateCredentialsDto source) {
        return User
                .builder()
                .username(source.getUsername())
                .email(source.getEmail())
                .role(source.getRole())
                .password(passwordEncoder.encode(source.getPassword()))
                .createdAt(ZonedDateTime.now())
                .build();
    }
}
