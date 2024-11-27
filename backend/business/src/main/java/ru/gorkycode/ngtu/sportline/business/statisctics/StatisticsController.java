package ru.gorkycode.ngtu.sportline.business.statisctics;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/user/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsFaker statisticsFaker;

    @GetMapping
    public StatisticsDto get() {
        return statisticsFaker.getDto();
    }
}