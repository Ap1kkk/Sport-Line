package ru.gorkycode.ngtu.sportline.business.system.exceptions.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.AppException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.messages.AppExceptionMessage;

import java.lang.reflect.InvocationTargetException;

/**
 * @author Egor Bokov
 */
@ControllerAdvice
public class GlobalExceptionHandler extends BaseExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AppExceptionMessage> handle(Exception e) {
        return buildAppException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvocationTargetException.class)
    public ResponseEntity<AppExceptionMessage> handle(InvocationTargetException e) {
        return buildAppException(e.getTargetException(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<AppExceptionMessage> handle(AppException e) {
        return buildAppException(e);
    }
}
