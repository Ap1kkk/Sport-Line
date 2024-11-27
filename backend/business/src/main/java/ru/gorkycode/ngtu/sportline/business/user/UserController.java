package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.user.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.EditProfileDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.ProfileDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.UserProjectionDto;
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

    @GetMapping("/profile")
    public ProfileDto getProfile() {
        return userService.getProfile();
    }

    @PostMapping("/create")
    public UserProjectionDto create(@RequestBody CreateCredentialsDto dto) {
        return userService.create(dto);
    }

    @PostMapping("/choose-preferences")
    public UserProjectionDto choosePreferences(@RequestBody List<Long> preferencesIds) {
        return userService.choosePreferences(preferencesIds);
    }

    @PostMapping("/edit")
    public UserProjectionDto edit(@RequestBody EditProfileDto dto) {
        return userService.editProfile(dto);
    }

    @PostMapping("/like")
    public void likeRoute(@RequestParam Long routeId) {
        userService.likeRoute(routeId);
    }

    @PostMapping("/unlike")
    public void unlikeRoute(@RequestParam Long routeId) {
        userService.unlikeRoute(routeId);
    }
}
