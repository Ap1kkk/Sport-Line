package ru.gorkycode.ngtu.sportline.business.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.dto.AuthenticatedDto;
import ru.gorkycode.ngtu.sportline.business.dto.AuthenticationCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.service.AuthService;
import ru.gorkycode.ngtu.sportline.business.user.UserService;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public AuthenticatedDto login(@RequestBody AuthenticationCredentialsDto dto) {
        return authService.authenticate(dto);
    }

    @GetMapping("/validate")
    public boolean validate(@RequestParam String token) {
        return authService.validate(token);
    }

    @PostMapping("/register")
    public AuthenticatedDto register(@RequestBody CreateCredentialsDto dto) {
        userService.create(dto);
        return authService.authenticate(AuthenticationCredentialsDto
                .builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build()
        );
    }
}
