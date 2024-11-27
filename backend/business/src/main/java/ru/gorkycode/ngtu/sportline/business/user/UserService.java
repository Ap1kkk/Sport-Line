package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.auth.AuthService;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;
import ru.gorkycode.ngtu.sportline.business.common.BaseEntity;
import ru.gorkycode.ngtu.sportline.business.routes.Route;
import ru.gorkycode.ngtu.sportline.business.user.dto.ProfileDto;
import ru.gorkycode.ngtu.sportline.business.routes.RouteService;
import ru.gorkycode.ngtu.sportline.business.user.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.EditProfileDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.UserProjectionDto;
import ru.gorkycode.ngtu.sportline.business.user.mappers.UserMapper;
import ru.gorkycode.ngtu.sportline.business.user.mappers.UserProjectionMapper;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserValidator validator;
    private final UserMapper mapper;
    private final UserProjectionMapper projectionMapper;

    private final AuthService authService;
    private final CategoryService categoryService;
    private final RouteService routeService;

    private final Faker faker = new Faker();

    public User getById(Long id) {
        return validator.throwIfNotExists(id);
    }

    @Transactional
    public UserProjectionDto create(CreateCredentialsDto dto) {
        log.debug("[User]: Create user for email: {}", dto.getEmail());

        validator.validateToCreate(dto);
        User user = mapper.map(dto);

        return projectionMapper.toDto(repository.saveAndFlush(user));
    }

    @Transactional
    public UserProjectionDto choosePreferences(List<Long> preferencesIds) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User]: user [{}] choosing preferences by ids: {}", currentUser.getId(), preferencesIds);

        validator.validatePreferencesIds(preferencesIds);

        List<Category> preferences = categoryService.getByIds(preferencesIds);
        currentUser.setPreferences(preferences);

        return projectionMapper.toDto(repository.saveAndFlush(currentUser));
    }

    @Transactional
    public UserProjectionDto editProfile(EditProfileDto dto) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User]: user [{}] editing profile: {}", currentUser.getId(), dto);

        validator.validateEditProfile(dto);

        currentUser.setAvatar(dto.getAvatar());
        List<Category> preferences = categoryService.getByIds(dto.getPreferencesIds());
        currentUser.setPreferences(preferences);

        return projectionMapper.toDto(repository.save(currentUser));
    }

    @Transactional
    public void likeRoute(Long routeId) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User] : user [{}] like route [{}]", currentUser.getId(), routeId);

        repository.loadWithFavouriteRoutes(currentUser.getId());

        if(currentUser.getFavouriteRoutes().stream().map(BaseEntity::getId).anyMatch(routeId::equals))
            return;

        Route route = routeService.getById(routeId);
        currentUser.addRoute(route);
        route.setLikes(route.getLikes() + 1);

        repository.save(currentUser);
    }

    @Transactional
    public void unlikeRoute(Long routeId) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User] : user [{}] unlike route [{}]", currentUser.getId(), routeId);

        repository.loadWithFavouriteRoutes(currentUser.getId());

        if(currentUser.getFavouriteRoutes().stream().map(BaseEntity::getId).noneMatch(routeId::equals))
            return;

        Route route = routeService.getById(routeId);
        currentUser.removeRoute(route);
        long updatedLikes = route.getLikes() - 1;
        route.setLikes(updatedLikes > 0 ? updatedLikes : 0);

        repository.save(currentUser);
        routeService.save(route);
    }

    @Transactional
    public ProfileDto getProfile() {
        User currentUser = authService.getCurrentUser();

        return ProfileDto
                .builder()
                .totalDistance(faker.random().nextLong(1_000_000L))
                .totalAchievements(faker.random().nextLong(1000L))
                .user(projectionMapper.toDto(currentUser))
                .build();
    }
}
