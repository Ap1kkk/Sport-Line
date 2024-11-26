package ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.AppException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.reasons.ErrorReason;

import java.util.Map;

/**
 * Exception class related to entity (jpa) exceptions
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DataException extends AppException {

    public DataException(ErrorReason reason, String message) {
        super(reason, message);
    }

    public DataException(ErrorReason reason, String message, Map<String, Object> details) {
        super(reason, message, details);
    }
}
