package ru.gorkycode.ngtu.sportline.business.file.image.cleaner;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/admin/image-cleaner")
@RequiredArgsConstructor
public class ImageCleanerController {

    private final ImageCleanerService service;

    @GetMapping("/all")
    public List<ImageToClean> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/cleanup")
    public void cleanup() {
        service.cleanup();
    }
}