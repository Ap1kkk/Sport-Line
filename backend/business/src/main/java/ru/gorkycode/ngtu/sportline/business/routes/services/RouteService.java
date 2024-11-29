package ru.gorkycode.ngtu.sportline.business.routes.services;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.analytics.AnalyticsClient;
import ru.gorkycode.ngtu.sportline.business.auth.AuthService;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;
import ru.gorkycode.ngtu.sportline.business.file.FileService;
import ru.gorkycode.ngtu.sportline.business.file.enums.ApplicationTargetDirectory;
import ru.gorkycode.ngtu.sportline.business.file.enums.DefaultTargetDirectory;
import ru.gorkycode.ngtu.sportline.business.routes.RouteValidator;
import ru.gorkycode.ngtu.sportline.business.routes.dto.GetRecommendationRoutesDto;
import ru.gorkycode.ngtu.sportline.business.routes.dto.RecommendationRoutesDto;
import ru.gorkycode.ngtu.sportline.business.routes.dto.RouteDto;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteFilter;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteRepository;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteSpecification;
import ru.gorkycode.ngtu.sportline.business.routes.mappers.RouteMapper;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation.ValidationException;
import ru.gorkycode.ngtu.sportline.business.user.UserService;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.ArrayList;
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

    private final AuthService authService;
    private final CategoryService categoryService;
    private final AnalyticsClient analyticsClient;
    private final FileService fileService;

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
    @SneakyThrows
    public Route create(RouteDto dto) {
        log.debug("[Route] : Creating route from dto: {}", dto);

        Route entity = mapper.toEntity(dto);
        mapper.linkCheckpoints(entity);
        List<Category> categories = categoryService.getByIds(dto.getCategoryIds());
        entity.setCategories(categories);
        String imagePath = fileService.upload(dto.getImage(), ApplicationTargetDirectory.ROUTE_IMAGES);
        entity.setImagePath(imagePath);

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

    public List<Route> getPopular(int limit) {
        return repository.findPopular(limit);
    }

    public List<Route> getPopularFiltered(RouteFilter filter, int limit) {
        return repository.findAll(RouteSpecification.withFilters(filter), Pageable.ofSize(limit)).stream().toList();
    }

    public List<Route> search(String searchQuery, RouteFilter filter) {
        if(Strings.isBlank(searchQuery))
            throw ValidationException.builder().message("Search search query must not be blank").build();

        return repository.findAll(RouteSpecification.withFilters(searchQuery, filter));
    }

    public List<Route> getRecommended(int limit) {
        return getRecommended(limit, null);
    }

    public List<Route> getRecommended(int limit, RouteFilter filter) {
        User currentUser = authService.getCurrentUser();

        GetRecommendationRoutesDto dto = GetRecommendationRoutesDto
                .builder()
                .userId(currentUser.getId())
                .filter(filter)
                .build();
        RecommendationRoutesDto recommendations = analyticsClient.getRecommendations(dto);

        List<Long> recommendationIds = recommendations.getRecommendations();
        if(recommendationIds == null || recommendations.getRecommendations().isEmpty()) {
            log.warn("[Route]: recommendations were empty");
            return getPopular(limit);
        }

        return repository.findAllById(recommendationIds);
    }
}
