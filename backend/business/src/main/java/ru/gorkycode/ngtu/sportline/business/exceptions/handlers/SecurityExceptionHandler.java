package ru.gorkycode.ngtu.sportline.business.exceptions.handlers;

import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.gorkycode.ngtu.sportline.business.exceptions.classes.security.AuthenticationException;
import ru.gorkycode.ngtu.sportline.business.exceptions.classes.security.PermissionException;
import ru.gorkycode.ngtu.sportline.business.exceptions.messages.AppExceptionMessage;

/**
 * @author Egor Bokov
 */
@ControllerAdvice
@Order(SecurityExceptionHandler.ORDER)
public class SecurityExceptionHandler extends BaseExceptionHandler {
    public static final int ORDER = 0;


    @ExceptionHandler
    public ResponseEntity<AppExceptionMessage> handle(PermissionException e) {
        return buildAppException(e);
    }

    @ExceptionHandler
    public ResponseEntity<AppExceptionMessage> handle(AuthenticationException e) {
        return buildAppException(e);
    }
}
