package ru.gorkycode.ngtu.sportline.business.routes.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gorkycode.ngtu.sportline.business.auth.AuthService;
import ru.gorkycode.ngtu.sportline.business.common.BaseEntity;
import ru.gorkycode.ngtu.sportline.business.routes.RouteFaker;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteFilter;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.routes.model.history.HistoryRoute;
import ru.gorkycode.ngtu.sportline.business.routes.model.history.HistoryRouteRepository;
import ru.gorkycode.ngtu.sportline.business.routes.model.history.HistoryRouteStatus;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.data.EntityNotFoundException;
import ru.gorkycode.ngtu.sportline.business.system.exceptions.classes.validation.ValidationException;
import ru.gorkycode.ngtu.sportline.business.user.UserRepository;
import ru.gorkycode.ngtu.sportline.business.user.UserService;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserRouteService {

    private final AuthService authService;

    private final UserRepository userRepository;

    private final RouteFaker routeFaker;
    private final RouteService routeService;
    private final HistoryRouteRepository historyRouteRepository;

    @Transactional
    public void likeRoute(Long routeId) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User] : user [{}] like route [{}]", currentUser.getId(), routeId);

        userRepository.loadWithFavouriteRoutes(currentUser.getId());

        if(currentUser.getFavouriteRoutes().stream().map(BaseEntity::getId).anyMatch(routeId::equals))
            return;

        Route route = routeService.getById(routeId);
        currentUser.addRoute(route);
        route.setLikes(route.getLikes() + 1);

        userRepository.save(currentUser);
    }

    @Transactional
    public void unlikeRoute(Long routeId) {
        User currentUser = authService.getCurrentUser();
        log.debug("[User] : user [{}] unlike route [{}]", currentUser.getId(), routeId);

        userRepository.loadWithFavouriteRoutes(currentUser.getId());

        if(currentUser.getFavouriteRoutes().stream().map(BaseEntity::getId).noneMatch(routeId::equals))
            return;

        Route route = routeService.getById(routeId);
        currentUser.removeRoute(route);
        long updatedLikes = route.getLikes() - 1;
        route.setLikes(updatedLikes > 0 ? updatedLikes : 0);

        userRepository.save(currentUser);
        routeService.save(route);
    }


    public HistoryRoute start(Long routeId) {
        User currentUser = authService.getCurrentUser();
        Route route = routeService.getById(routeId);

        return historyRouteRepository.save(HistoryRoute
                .builder()
                        .user(currentUser)
                        .route(route)
                        .status(HistoryRouteStatus.STARTED)
                .build()
        );
    }

    public HistoryRoute leave(Long historyId) {
        return updateStatus(historyId, HistoryRouteStatus.LEAVED);
    }

    public HistoryRoute finish(Long historyId) {
        return updateStatus(historyId, HistoryRouteStatus.FINISHED);
    }

    private HistoryRoute updateStatus(Long historyId, HistoryRouteStatus status) {
        routeService.getById(historyId);

        HistoryRoute historyRoute = historyRouteRepository.findById(historyId)
                .orElseThrow(() -> new EntityNotFoundException(HistoryRoute.class, historyId));

        HistoryRouteStatus routeStatus = historyRoute.getStatus();
        if(!routeStatus.equals(HistoryRouteStatus.STARTED))
            throw ValidationException.builder().message("Invalid history route status. Status must be STARTED, but it was: %s".formatted(routeStatus)).build();

        historyRoute.setStatus(status);

        return historyRouteRepository.save(historyRoute);
    }

    public List<Route> getHistory(RouteFilter filter) {
        return routeFaker.get(5, 10);
    }

    public List<Route> getFavourite(RouteFilter filter) {
        return routeFaker.get(5, 10);
    }
}
