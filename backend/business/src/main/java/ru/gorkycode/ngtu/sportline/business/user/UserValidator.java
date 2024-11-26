package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation.ValidationException;
import ru.gorkycode.ngtu.sportline.business.user.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.EditProfileDto;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.List;

import static ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation.ValidationViolationDto.requiredIsNull;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class UserValidator {

    private static final String CREATE_ERROR_MESSAGE = "Create credentials validation failed";
    private static final String PREFERENCES_IDS_ERROR_MESSAGE = "User preferences ids validation failed";
    private static final String EDIT_PROFILE_ERROR_MESSAGE = "Edit profile dto validation failed";

    private final UserRepository repository;

    public User throwIfNotExists(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(User.class, id));
    }

    public void validateToCreate(CreateCredentialsDto dto) {
        ValidationException.Builder exceptionBuilder = ValidationException.builder().message(CREATE_ERROR_MESSAGE);

        if(dto == null) {
            exceptionBuilder.addViolation(requiredIsNull("dto", "Dto"));
            throw exceptionBuilder.build();
        }

        if(Strings.isBlank(dto.getUsername()))
            exceptionBuilder.addViolation(requiredIsNull("username", "Username"));
        if(Strings.isBlank(dto.getEmail()))
            exceptionBuilder.addViolation(requiredIsNull("email", "Email"));
        if(Strings.isBlank(dto.getPassword()))
            exceptionBuilder.addViolation(requiredIsNull("password", "Password"));

        if(dto.getRole() == null)
            exceptionBuilder.addViolation(requiredIsNull("role", "Role"));

        if(exceptionBuilder.hasViolations())
            throw exceptionBuilder.build();
    }

    public void validatePreferencesIds(List<Long> preferencesIds) {
        ValidationException.Builder exceptionBuilder = ValidationException.builder().message(PREFERENCES_IDS_ERROR_MESSAGE);
        validatePreferencesIds(preferencesIds, exceptionBuilder);

        if(exceptionBuilder.hasViolations())
            throw exceptionBuilder.build();
    }

    public void validatePreferencesIds(List<Long> preferencesIds, ValidationException.Builder exceptionBuilder) {
        if(preferencesIds == null || preferencesIds.isEmpty()) {
            exceptionBuilder.addViolation(requiredIsNull("preferencesIds", "User preferences ids"));
        }
    }

    public void validateEditProfile(EditProfileDto dto) {
        ValidationException.Builder exceptionBuilder = ValidationException.builder().message(EDIT_PROFILE_ERROR_MESSAGE);

        if(dto == null) {
            exceptionBuilder.addViolation(requiredIsNull("dto", "Dto"));
            throw exceptionBuilder.build();
        }

        if(dto.getAvatar() == null)
            exceptionBuilder.addViolation(requiredIsNull("avatar", "Avatar"));

        validatePreferencesIds(dto.getPreferencesIds(), exceptionBuilder);

        if(exceptionBuilder.hasViolations())
            throw exceptionBuilder.build();
    }
}
