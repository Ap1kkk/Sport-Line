package ru.gorkycode.ngtu.sportline.business.file.image.handler;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author Egor Bokov
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ImageToHandle {
    String id();
    String directory() default "/images/";
    boolean isRequired() default false;
}
