package ru.gorkycode.ngtu.sportline.business.exceptions.classes.security;

import lombok.Getter;
import ru.gorkycode.ngtu.sportline.business.exceptions.classes.AppException;
import ru.gorkycode.ngtu.sportline.business.exceptions.reasons.DefaultErrorReason;
import ru.gorkycode.ngtu.sportline.business.exceptions.reasons.ErrorReason;

/**
 * Exception class used for authentication errors
 * @author Egor Bokov
 */
@Getter
public class AuthenticationException extends AppException {
    public static final ErrorReason REASON = DefaultErrorReason.AUTHENTICATION_ERROR;
    public static final int STATUS_VALUE = REASON.getStatus().value();


    public AuthenticationException(String message) {
        super(REASON, message);
    }
}
