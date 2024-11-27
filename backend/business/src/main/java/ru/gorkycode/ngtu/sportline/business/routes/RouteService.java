package ru.gorkycode.ngtu.sportline.business.routes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteFilter;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteRepository;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteSpecification;
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
    private final RouteValidator validator;

    private final CategoryService categoryService;

    public List<Route> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Route getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Route.class, id));
    }

    @Transactional(readOnly = true)
    public List<Route> getFilteredRoutes(RouteFilter filter) {
        return repository.findAll(RouteSpecification.withFilters(filter));
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

    @Transactional
    public void delete(Long id) {
        log.debug("[Route] : Deleting route by id: {}", id);

        Route route = validator.throwIfNotExist(id);
        repository.delete(route);
    }

    public Route save(Route entity) {
        return repository.save(entity);
    }

    public Route getDaily() {
        Long minimumId = repository.findMinimumId();
        return repository.findById(minimumId).orElseThrow(() -> new EntityNotFoundException(Route.class, minimumId));
    }
}
