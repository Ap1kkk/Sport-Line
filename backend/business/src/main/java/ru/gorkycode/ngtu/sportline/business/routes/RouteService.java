package ru.gorkycode.ngtu.sportline.business.routes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository repository;
    private final RouteMapper mapper;

    private final CategoryService categoryService;

    @Transactional(readOnly = true)
    public Route getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Route.class, id));
    }

    @Transactional
    public Route create(RouteDto dto) {
        log.debug("[Route] : Creating route from dto: {}", dto);

        Route entity = mapper.toEntity(dto);
        mapper.linkCheckpoints(entity);
        List<Category> categories = categoryService.getByIds(dto.getCategoryIds());
        entity.setCategories(categories);

        return repository.save(entity);
    }

}
