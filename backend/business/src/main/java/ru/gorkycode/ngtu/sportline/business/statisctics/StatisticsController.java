package ru.gorkycode.ngtu.sportline.business.statisctics;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/user/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @PostMapping
    public StatisticsDto get(@RequestParam StatisticsPeriod period) {
        return statisticsService.getStatistics(period);
    }
}
