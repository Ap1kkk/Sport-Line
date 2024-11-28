package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.user.avatar.UserAvatar;
import ru.gorkycode.ngtu.sportline.business.user.model.User;
import ru.gorkycode.ngtu.sportline.business.user.model.UserRole;

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
    private UserRole role;
    private UserAvatar avatar;
    private ZonedDateTime createdAt;
    private List<Category> preferences;
}