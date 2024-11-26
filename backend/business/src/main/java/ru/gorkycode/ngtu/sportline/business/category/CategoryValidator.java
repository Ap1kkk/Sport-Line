package ru.gorkycode.ngtu.sportline.business.category;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation.ValidationException;

import static ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation.ValidationViolationDto.requiredIsNull;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class CategoryValidator {

    private static final String CREATE_VALIDATION_MESSAGE = "Create category validation failed";
    private static final String UPDATE_VALIDATION_MESSAGE = "Update category validation failed";

    private final CategoryRepository repository;

    public Category throwIfNotExists(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Category.class, id));
    }

    public void validateToCreate(CategoryDto dto) {
        ValidationException.Builder exceptionBuilder = ValidationException.builder().message(CREATE_VALIDATION_MESSAGE);

        validate(dto, exceptionBuilder);

        if(exceptionBuilder.hasViolations())
            throw exceptionBuilder.build();
    }

    public Category validateToUpdate(CategoryDto dto) {
        ValidationException.Builder exceptionBuilder = ValidationException.builder().message(UPDATE_VALIDATION_MESSAGE);

        validate(dto, exceptionBuilder);

        if(dto.getId() == null)
            exceptionBuilder.addViolation(requiredIsNull("id", "Id"));

        if(exceptionBuilder.hasViolations())
            throw exceptionBuilder.build();

        return throwIfNotExists(dto.getId());
    }

    public void validate(CategoryDto dto, ValidationException.Builder exceptionBuilder) {
        if(dto == null) {
            exceptionBuilder.addViolation(requiredIsNull("dto", "Dto"));
            throw exceptionBuilder.build();
        }

        if(Strings.isBlank(dto.getName()))
            exceptionBuilder.addViolation(requiredIsNull("name", "Name"));
    }
}
