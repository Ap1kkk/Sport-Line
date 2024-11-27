package ru.gorkycode.ngtu.sportline.business.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.user.model.UserRole;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCredentialsDto {
    private String username;
    private String email;
    private String password;
    private UserRole role;
}
