package ru.gorkycode.ngtu.sportline.business.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.dto.CreateCredentialsDto;
import ru.gorkycode.ngtu.sportline.business.mappers.UserMapper;
import ru.gorkycode.ngtu.sportline.business.model.User;
import ru.gorkycode.ngtu.sportline.business.repository.UserRepository;
import ru.gorkycode.ngtu.sportline.business.validators.UserValidator;

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

    public User getById(Long id) {
        return validator.throwIfNotExists(id);
    }

    @Transactional
    public User create(CreateCredentialsDto dto) {
        log.debug("Create user for email: {}", dto.getEmail());

        validator.validateToCreate(dto);
        User user = mapper.map(dto);

        return repository.saveAndFlush(user);
    }
}
