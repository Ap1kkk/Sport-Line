package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.user.dto.*;
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

    @PostMapping("/finish-registration")
    public UserProjectionDto finishRegistration(@RequestBody FinishRegistrationDto dto) {
        return userService.finishRegistration(dto);
    }

    @PostMapping("/choose-preferences")
    public UserProjectionDto choosePreferences(@RequestBody List<Long> preferencesIds) {
        return userService.choosePreferences(preferencesIds);
    }

    @PostMapping("/edit")
    public UserProjectionDto edit(@RequestBody EditProfileDto dto) {
        return userService.editProfile(dto);
    }
}
