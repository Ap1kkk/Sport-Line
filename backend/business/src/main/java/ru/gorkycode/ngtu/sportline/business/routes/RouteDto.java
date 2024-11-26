package ru.gorkycode.ngtu.sportline.business.routes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gorkycode.ngtu.sportline.business.checkpoint.Checkpoint;

import java.util.List;

/**
 * DTO for {@link Route}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteDto {
    private Long id;
    private String name;
    private String description;
    private RouteDifficulty difficulty;
    private Long distance;
    private Long duration;
    private List<Long> categoryIds;
    private List<Checkpoint> checkpoints;
}