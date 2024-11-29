package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.auth.AuthService;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.category.CategoryService;
import ru.gorkycode.ngtu.sportline.business.region.RegionRepository;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;
import ru.gorkycode.ngtu.sportline.business.user.avatar.UserAvatar;
import ru.gorkycode.ngtu.sportline.business.user.avatar.UserAvatarRepository;
import ru.gorkycode.ngtu.sportline.business.user.dto.*;
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

    private final Faker faker = new Faker();
    private final UserAvatarRepository userAvatarRepository;
    private final RegionRepository regionRepository;

    public User getById(Long id) {
        return validator.throwIfNotExists(id);
    }

    @Transactional
    public UserProjectionDto create(CreateCredentialsDto dto) {
        log.debug("[User]: Create user for email: {}", dto.getEmail());

        validator.validateToCreate(dto);
        User user = mapper.map(dto);
        user.setAvatar(getRandomAvatar());

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

        Long avatarId = dto.getAvatarId();
        UserAvatar userAvatar = userAvatarRepository.findById(avatarId)
                .orElseThrow(() -> new EntityNotFoundException(UserAvatar.class, avatarId));
        currentUser.setAvatar(userAvatar);
        List<Category> preferences = categoryService.getByIds(dto.getPreferencesIds());
        currentUser.setPreferences(preferences);

        return projectionMapper.toDto(repository.save(currentUser));
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

    private UserAvatar getRandomAvatar() {
        List<Long> allIds = userAvatarRepository.findAllIds();

        Long id = allIds.getFirst();
        return userAvatarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UserAvatar.class, id));
    }

    public UserProjectionDto finishRegistration(FinishRegistrationDto dto) {
        User currentUser = authService.getCurrentUser();
        validator.validateFinishRegistration(dto);

        User updatedUser = mapper.map(currentUser, dto);
        return projectionMapper.toDto(repository.save(currentUser));
    }
}
