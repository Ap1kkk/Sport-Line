package ru.gorkycode.ngtu.sportline.business.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.gorkycode.ngtu.sportline.business.model.User;

import java.util.Optional;

/**
 * @author Egor Bokov
 */
@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String name);

    Optional<User> findByEmail(String email);
}
