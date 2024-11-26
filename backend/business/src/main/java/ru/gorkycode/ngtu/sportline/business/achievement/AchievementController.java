package ru.gorkycode.ngtu.sportline.business.achievement;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/user/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementFaker achievementFaker;

    @GetMapping
    public List<AchievementDto> getAll() {
        return achievementFaker.getDto(5, 15);
    }
}
