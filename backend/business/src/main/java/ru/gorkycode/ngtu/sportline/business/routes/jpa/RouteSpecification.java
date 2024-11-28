package ru.gorkycode.ngtu.sportline.business.routes.jpa;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;

/**
 * @author Egor Bokov
 */
public class RouteSpecification {

    public static Specification<Route> withFilters(RouteFilter filter) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            // Фильтр по сложностям
            if (filter.getDifficulties() != null && !filter.getDifficulties().isEmpty()) {
                predicate = criteriaBuilder.and(predicate,
                        root.get("difficulty").in(filter.getDifficulties()));
            }

            // Фильтр по строгому совпадению категорий
            if (filter.getCategoryIds() != null && !filter.getCategoryIds().isEmpty()) {
                // Подзапрос для проверки наличия всех категорий
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<Route> subRoot = subquery.from(Route.class);
                Join<Route, Category> subCategories = subRoot.join("categories");

                // Условие для проверки совпадения всех категорий
                subquery.select(subRoot.get("id"))
                        .where(subRoot.get("id").in(root.get("id")),
                                subCategories.get("id").in(filter.getCategoryIds()))
                        .groupBy(subRoot.get("id"))
                        .having(criteriaBuilder.equal(
                                criteriaBuilder.countDistinct(subCategories.get("id")),
                                filter.getCategoryIds().size()
                        ));

                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.exists(subquery));
            }

            // Фильтр по длительности
            if (filter.getDurationFrom() != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("duration"), filter.getDurationFrom()));
            }
            if (filter.getDurationTo() != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("duration"), filter.getDurationTo()));
            }

            // Фильтр по расстоянию
            if (filter.getDistanceFrom() != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("distance"), filter.getDistanceFrom()));
            }
            if (filter.getDistanceTo() != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("distance"), filter.getDistanceTo()));
            }

            // Применение сортировки по дате
            if (filter.getOrder() != null) {
                if (filter.getOrder() == RouteFilterOrder.ASC) {
                    query.orderBy(criteriaBuilder.asc(root.get("createdAt")));
                } else if (filter.getOrder() == RouteFilterOrder.DESC) {
                    query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
                }
            }

            return predicate;
        };
    }
}
