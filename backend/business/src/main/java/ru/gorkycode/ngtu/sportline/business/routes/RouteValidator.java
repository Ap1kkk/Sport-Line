package ru.gorkycode.ngtu.sportline.business.routes;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteRepository;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class RouteValidator {

    private final RouteRepository repository;

    public Route throwIfNotExist(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Route.class, id));
    }
}
