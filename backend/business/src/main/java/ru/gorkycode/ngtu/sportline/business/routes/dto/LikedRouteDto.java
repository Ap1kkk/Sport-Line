package ru.gorkycode.ngtu.sportline.business.routes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikedRouteDto {
    private boolean isLikedByCurrentUser;
    private Route route;
}
