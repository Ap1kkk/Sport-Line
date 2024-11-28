package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditProfileDto {
    private Long avatarId;
    private List<Long> preferencesIds;
}
