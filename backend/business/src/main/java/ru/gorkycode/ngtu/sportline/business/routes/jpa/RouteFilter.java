package ru.gorkycode.ngtu.sportline.business.routes.jpa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.routes.model.RouteDifficulty;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteFilter {
    private List<RouteDifficulty> difficulties;
    private List<Long> categoryIds;
    private Long durationFrom;
    private Long durationTo;
    private Long distanceFrom;
    private Long distanceTo;
}
