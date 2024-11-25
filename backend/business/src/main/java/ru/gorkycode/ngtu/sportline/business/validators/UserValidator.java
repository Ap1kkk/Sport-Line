package ru.gorkycode.ngtu.sportline.business.validators;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.exceptions.classes.data.EntityNotFoundException;
import ru.gorkycode.ngtu.sportline.business.exceptions.classes.validation.ValidationException;
import ru.gorkycode.ngtu.sportline.business.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.model.User;
import ru.gorkycode.ngtu.sportline.business.repository.UserRepository;

import static ru.gorkycode.ngtu.sportline.business.exceptions.classes.validation.ValidationViolationDto.buildRequiredFieldNotPreset;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class UserValidator {

    private static final String CREATE_ERROR_MESSAGE = "Create credentials validation failed";

    private final UserRepository repository;

    public User throwIfNotExists(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(User.class, id));
    }

    public void validateToCreate(CreateCredentialsDto dto) {
        ValidationException.Builder exceptionBuilder = ValidationException.builder().message(CREATE_ERROR_MESSAGE);

        if(dto == null) {
            exceptionBuilder.addViolation(buildRequiredFieldNotPreset("dto", "Dto"));
            throw exceptionBuilder.build();
        }

        if(Strings.isBlank(dto.getUsername()))
            exceptionBuilder.addViolation(buildRequiredFieldNotPreset("username", "Username"));
        if(Strings.isBlank(dto.getEmail()))
            exceptionBuilder.addViolation(buildRequiredFieldNotPreset("email", "Email"));
        if(Strings.isBlank(dto.getPassword()))
            exceptionBuilder.addViolation(buildRequiredFieldNotPreset("password", "Password"));

        if(dto.getRole() == null)
            exceptionBuilder.addViolation(buildRequiredFieldNotPreset("role", "Role"));

        if(exceptionBuilder.hasViolations())
            throw exceptionBuilder.build();
    }
}
