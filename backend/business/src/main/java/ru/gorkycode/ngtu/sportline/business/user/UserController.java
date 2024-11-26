package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.user.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.EditProfileDto;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.List;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public User getById(@RequestParam Long id) {
        return userService.getById(id);
    }

    @PostMapping("/create")
    public User create(@RequestBody CreateCredentialsDto dto) {
        return userService.create(dto);
    }

    @PostMapping("/choose-preferences")
    public User choosePreferences(@RequestBody List<Long> preferencesIds) {
        return userService.choosePreferences(preferencesIds);
    }

    @PostMapping("/edit")
    public User edit(@RequestBody EditProfileDto dto) {
        return userService.editProfile(dto);
    }

    @PostMapping("/like")
    public void likeRoute(@RequestParam Long routeId) {
        userService.likeRoute(routeId);
    }
}
