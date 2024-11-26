package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;
import ru.gorkycode.ngtu.sportline.business.common.BaseEntity;
import ru.gorkycode.ngtu.sportline.business.routes.RouteService;
import ru.gorkycode.ngtu.sportline.business.user.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.user.dto.EditProfileDto;
import ru.gorkycode.ngtu.sportline.business.user.model.User;
import ru.gorkycode.ngtu.sportline.business.auth.AuthService;

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

    private final AuthService authService;
    private final CategoryService categoryService;
    private final RouteService routeService;

    public User getById(Long id) {
        return validator.throwIfNotExists(id);
    }

    @Transactional
    public User create(CreateCredentialsDto dto) {
        log.debug("[User]: Create user for email: {}", dto.getEmail());

        validator.validateToCreate(dto);
        User user = mapper.map(dto);

        return repository.saveAndFlush(user);
    }

    @Transactional
    public User choosePreferences(List<Long> preferencesIds) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User]: user [{}] choosing preferences by ids: {}", currentUser.getId(), preferencesIds);

        validator.validatePreferencesIds(preferencesIds);

        List<Category> preferences = categoryService.getByIds(preferencesIds);
        currentUser.setPreferences(preferences);

        return repository.save(currentUser);
    }

    @Transactional
    public User editProfile(EditProfileDto dto) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User]: user [{}] editing profile: {}", currentUser.getId(), dto);

        validator.validateEditProfile(dto);

        currentUser.setAvatar(dto.getAvatar());
        List<Category> preferences = categoryService.getByIds(dto.getPreferencesIds());
        currentUser.setPreferences(preferences);

        return repository.save(currentUser);
    }

    @Transactional
    public void likeRoute(Long routeId) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User] : user [{}] like route [{}]", currentUser.getId(), routeId);

        repository.loadWithFavouriteRoutes(currentUser.getId());

        if(currentUser.getFavouriteRoutes().stream().map(BaseEntity::getId).anyMatch(routeId::equals))
            return;

        currentUser.addRoute(routeService.getById(routeId));
        repository.save(currentUser);
    }
}
