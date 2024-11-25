package ru.gorkycode.ngtu.sportline.business.exceptions.classes.security;

import lombok.Getter;
import ru.gorkycode.ngtu.sportline.business.exceptions.classes.AppException;
import ru.gorkycode.ngtu.sportline.business.exceptions.reasons.ErrorReason;

import java.util.Map;

/**
 * Exception class for security cases when access denied
 */
@Getter
public class PermissionException extends AppException {

    public PermissionException(ErrorReason reason, String message) {
        super(reason, message);
    }

    public PermissionException(ErrorReason reason, String message, Map<String, Object> details) {
        super(reason, message, details);
    }
}
