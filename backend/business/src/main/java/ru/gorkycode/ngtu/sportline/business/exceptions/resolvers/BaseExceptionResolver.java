package ru.gorkycode.ngtu.sportline.business.exceptions.resolvers;

import ru.gorkycode.ngtu.sportline.business.exceptions.classes.AppException;
import ru.gorkycode.ngtu.sportline.business.exceptions.messages.AppExceptionMessage;

/**
 * @author Egor Bokov
 */
public abstract class BaseExceptionResolver {

    public AppExceptionMessage buildMessage(AppException e) {
        return AppExceptionMessage
                .builder()
                .reason(e.getReason().getReason())
                .message(e.getMessage())
                .status(e.getReason().getStatus().value())
                .details(e.getDetails())
                .build();
    }
}
