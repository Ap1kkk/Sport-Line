package ru.gorkycode.ngtu.sportline.business.file.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author Egor Bokov
 */
@Getter
@RequiredArgsConstructor
public class DefaultTargetDirectory implements TargetDirectory {
    private final String directory;
}
