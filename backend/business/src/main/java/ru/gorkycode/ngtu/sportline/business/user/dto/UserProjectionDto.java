package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.region.Region;
import ru.gorkycode.ngtu.sportline.business.user.activity.UserActivity;
import ru.gorkycode.ngtu.sportline.business.user.avatar.UserAvatar;
import ru.gorkycode.ngtu.sportline.business.user.model.User;
import ru.gorkycode.ngtu.sportline.business.user.model.UserGender;
import ru.gorkycode.ngtu.sportline.business.user.model.UserRole;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * DTO for {@link User}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProjectionDto {
    private Long id;
    private String username;
    private String email;
    private UserGender gender;
    private UserActivity activity;
    private Region region;
    private UserAvatar avatar;
    private LocalDate birthday;
    private UserRole role;
    private ZonedDateTime createdAt;
    private List<Category> preferences;
}