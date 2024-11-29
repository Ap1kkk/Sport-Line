package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.user.model.UserGender;

import java.time.LocalDate;

/**
 * @author Egor Bokov
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinishRegistrationDto {
    private LocalDate birthday;
    private UserGender gender;
    private Long regionId;
    private Long activityId;
}
