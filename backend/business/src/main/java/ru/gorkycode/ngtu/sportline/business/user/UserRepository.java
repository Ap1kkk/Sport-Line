package ru.gorkycode.ngtu.sportline.business.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.Optional;

/**
 * @author Egor Bokov
 */
@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String name);

    Optional<User> findByEmail(String email);

    @Query("select u from User u join fetch u.favouriteRoutes where u.id = :id")
    Optional<User> loadWithFavouriteRoutes(Long id);
}
