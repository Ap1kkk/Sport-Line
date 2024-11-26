package ru.gorkycode.ngtu.sportline.business.file.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author Egor Bokov
 */
@Getter
@RequiredArgsConstructor
public enum ApplicationTargetDirectory implements TargetDirectory {

    ACHIEVEMENTS_IMAGES(Values.ACHIEVEMENTS_IMAGES_VALUE),
    ROUTE_IMAGES(Values.ROUTE_IMAGES_VALUE);

    private final String directory;

    public static class Values {
        public static final String ACHIEVEMENTS_IMAGES_VALUE = "/achievements/images/";
        public static final String ROUTE_IMAGES_VALUE = "/routes/images/";
    }
}
