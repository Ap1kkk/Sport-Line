package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private Long totalDistance;
    private Long totalAchievements;
    private UserProjectionDto user;
}
