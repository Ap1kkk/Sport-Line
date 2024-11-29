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
public class GetStatisticsDto {
    private Long userId;
    private StatisticsPeriod period;
}
