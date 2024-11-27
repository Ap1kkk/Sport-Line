package ru.gorkycode.ngtu.sportline.business.category.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryDto;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/admin/category")
@RequiredArgsConstructor
public class CategoryAdminController {

    private final CategoryService categoryService;

    @PostMapping
    public Category create(@RequestBody CategoryDto dto) {
        return categoryService.create(dto);
    }

    @PutMapping
    public Category update(@RequestBody CategoryDto dto) {
        return categoryService.update(dto);
    }

    @DeleteMapping
    public void delete(@RequestParam Long id) {
        categoryService.delete(id);
    }
}
