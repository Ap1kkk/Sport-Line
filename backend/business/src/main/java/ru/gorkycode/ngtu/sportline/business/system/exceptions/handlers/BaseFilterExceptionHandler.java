package ru.gorkycode.ngtu.sportline.business.system.exceptions.handlers;

import ru.gorkycode.ngtu.sportline.business.system.exceptions.messages.AppExceptionMessage;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.reasons.ErrorReason;

import java.util.HashMap;
import java.util.Map;

/**
 * Base class for exception handling in Spring filters
 * @author Egor Bokov
 */
public class BaseFilterExceptionHandler extends BaseExceptionHandler {
    protected AppExceptionMessage build(ErrorReason errorReason, String message, String uri) {
        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("uri", uri);

        return buildAppException(errorReason, message, errorDetails).getBody();
    }
}
