package ru.gorkycode.ngtu.sportline.business.routes.travelled;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Egor Bokov
 */
@Embeddable
@Data
@NoArgsConstructor
public class HistoryRouteId {
    private Long userId;
    private Long routeId;
}
