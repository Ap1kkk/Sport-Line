package ru.gorkycode.ngtu.sportline.business.exceptions.reasons;

import org.springframework.http.HttpStatus;
import ru.gorkycode.ngtu.sportline.business.exceptions.messages.AppExceptionMessage;

/**
 * Used as error reason in {@link AppExceptionMessage application error message}
 */
public interface ErrorReason {
    String getReason();
    HttpStatus getStatus();
}
