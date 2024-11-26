package ru.gorkycode.ngtu.sportline.business.system.exceptions.resolvers;

import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.AppException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.messages.AppExceptionMessage;

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
