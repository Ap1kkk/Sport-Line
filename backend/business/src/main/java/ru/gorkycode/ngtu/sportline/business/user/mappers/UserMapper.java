package ru.gorkycode.ngtu.sportline.business.user.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.user.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.time.ZonedDateTime;
import java.util.Random;

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
