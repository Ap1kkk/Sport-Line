package ru.gorkycode.ngtu.sportline.business.routes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Egor Bokov
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRoutesDto {
    private List<Long> recommendations;
}
