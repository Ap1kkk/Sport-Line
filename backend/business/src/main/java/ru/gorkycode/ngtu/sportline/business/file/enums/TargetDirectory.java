package ru.gorkycode.ngtu.sportline.business.file.enums;

public interface TargetDirectory {
    String getDirectory();

    static TargetDirectory fromString(String string) {
        return new DefaultTargetDirectory(string);
    }
}