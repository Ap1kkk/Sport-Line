package ru.gorkycode.ngtu.sportline.business.routes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteFilter;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetRecommendationRoutesDto {
    private Long userId;
    private RouteFilter filter;
}
