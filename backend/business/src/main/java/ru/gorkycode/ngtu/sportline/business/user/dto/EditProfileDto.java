package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.user.model.UserAvatar;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditProfileDto {
    private UserAvatar avatar;
    private List<Long> preferencesIds;
}
