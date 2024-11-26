package ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Default set of {@link ValidationErrorType validation error types}
 */
@Getter
@RequiredArgsConstructor
public enum DefaultValidationErrorTypes implements ValidationErrorType {
    CONSTRAINT_VIOLATION("constraint_violation"),
    WRONG_VALUE("wrong_value"),
    REQUIRED_FIELD_NOT_PRESENT("required_field_not_present");


    private final String type;
}
