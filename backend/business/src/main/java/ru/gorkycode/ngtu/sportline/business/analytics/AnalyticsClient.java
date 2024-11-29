package ru.gorkycode.ngtu.sportline.business.analytics;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ru.gorkycode.ngtu.sportline.business.routes.dto.GetRecommendationRoutesDto;
import ru.gorkycode.ngtu.sportline.business.routes.dto.RecommendationRoutesDto;
import ru.gorkycode.ngtu.sportline.business.statisctics.GetStatisticsDto;
import ru.gorkycode.ngtu.sportline.business.statisctics.StatisticsDto;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * @author Egor Bokov
 */
@FeignClient(value = "analytics-client", url = "${clients.analytics.url}")
public interface AnalyticsClient {

    @PostMapping(value = "/statistic")
    StatisticsDto getStatistics(@RequestBody GetStatisticsDto dto);

    @PostMapping(value = "/recommendations/")
    RecommendationRoutesDto getRecommendations(@RequestBody GetRecommendationRoutesDto dto);
}
