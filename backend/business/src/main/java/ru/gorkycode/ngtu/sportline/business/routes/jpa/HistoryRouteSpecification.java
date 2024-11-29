package ru.gorkycode.ngtu.sportline.business.routes.jpa;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.routes.model.history.HistoryRoute;

/**
 * @author Egor Bokov
 */
public class HistoryRouteSpecification {

    public static Specification<HistoryRoute> withFilters(RouteFilter filter) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            // Фильтр по сложностям маршрута
            if (filter.getDifficulties() != null && !filter.getDifficulties().isEmpty()) {
                Join<HistoryRoute, Route> routeJoin = root.join("route");
                predicate = criteriaBuilder.and(predicate,
                        routeJoin.get("difficulty").in(filter.getDifficulties()));
            }

            // Фильтр по категориям маршрута
            if (filter.getCategoryIds() != null && !filter.getCategoryIds().isEmpty()) {
                Join<HistoryRoute, Route> routeJoin = root.join("route");
                Join<Route, ?> categories = routeJoin.join("categories");
                predicate = criteriaBuilder.and(predicate,
                        categories.get("id").in(filter.getCategoryIds()));
            }

            // Фильтр по длительности маршрута
            if (filter.getDurationFrom() != null) {
                Join<HistoryRoute, Route> routeJoin = root.join("route");
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(routeJoin.get("duration"), filter.getDurationFrom()));
            }
            if (filter.getDurationTo() != null) {
                Join<HistoryRoute, Route> routeJoin = root.join("route");
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(routeJoin.get("duration"), filter.getDurationTo()));
            }

            // Фильтр по расстоянию маршрута
            if (filter.getDistanceFrom() != null) {
                Join<HistoryRoute, Route> routeJoin = root.join("route");
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(routeJoin.get("distance"), filter.getDistanceFrom()));
            }
            if (filter.getDistanceTo() != null) {
                Join<HistoryRoute, Route> routeJoin = root.join("route");
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(routeJoin.get("distance"), filter.getDistanceTo()));
            }

            // Применение сортировки по дате
            if (filter.getOrder() != null) {
                if (filter.getOrder() == RouteFilterOrder.ASC) {
                    query.orderBy(criteriaBuilder.asc(root.get("startedAt")));
                } else if (filter.getOrder() == RouteFilterOrder.DESC) {
                    query.orderBy(criteriaBuilder.desc(root.get("startedAt")));
                }
            }

            return predicate;
        };
    }
}