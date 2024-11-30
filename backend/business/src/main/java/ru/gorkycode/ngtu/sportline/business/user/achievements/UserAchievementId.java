package ru.gorkycode.ngtu.sportline.business.user.achievements;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Egor Bokov
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAchievementId {
    private Long userId;
    private Long achievementId;
}
