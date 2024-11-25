package ru.gorkycode.ngtu.sportline.business.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.model.User;
import ru.gorkycode.ngtu.sportline.business.user.UserService;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public User getById(@RequestParam Long id) {
        return userService.getById(id);
    }

    @PostMapping
    public User create(@RequestBody CreateCredentialsDto dto) {
        return userService.create(dto);
    }
}
