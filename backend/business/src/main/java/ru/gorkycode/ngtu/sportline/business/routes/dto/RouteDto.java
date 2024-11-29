package ru.gorkycode.ngtu.sportline.business.routes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import ru.gorkycode.ngtu.sportline.business.checkpoint.Checkpoint;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.routes.model.RouteDifficulty;

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
    private MultipartFile image;
}