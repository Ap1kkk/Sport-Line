package ru.gorkycode.ngtu.sportline.business.routes.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.common.BaseEntity;
import ru.gorkycode.ngtu.sportline.business.routes.dto.LikedRouteDto;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class LikedRouteMapper {

    public List<LikedRouteDto> map(List<Route> routes, User currentUser) {
        Set<Long> likedIds = currentUser.getFavouriteRoutes().stream().map(BaseEntity::getId).collect(Collectors.toSet());
        List<LikedRouteDto> target = new ArrayList<>();
        for (Route route : routes) {
            target.add(map(route, likedIds));
        }
        return target;
    }

    public LikedRouteDto map(Route route, Set<Long> likedIds) {
        return LikedRouteDto
                .builder()
                .route(route)
                .isLikedByCurrentUser(likedIds.contains(route.getId()))
                .build();
    }
}
