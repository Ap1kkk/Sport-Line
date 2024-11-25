package ru.gorkycode.ngtu.sportline.business.dto;

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
public class AuthenticationCredentialsDto {
    private String email;
    private String password;
}

