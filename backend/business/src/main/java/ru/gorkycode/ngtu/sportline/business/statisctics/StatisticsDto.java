package ru.gorkycode.ngtu.sportline.business.statisctics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDto {
    private long totalDistance;
    private long totalSteps;
    private long totalDuration;
    private long totalCheckpoints;
    private long averageRouteDistance;
    private long averageRouteDuration;
    private int favouriteRoutesCount;
    private int travelledRoutesCount;
}
