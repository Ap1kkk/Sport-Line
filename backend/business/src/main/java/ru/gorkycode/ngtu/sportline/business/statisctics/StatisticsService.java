package ru.gorkycode.ngtu.sportline.business.statisctics;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.gorkycode.ngtu.sportline.business.analytics.AnalyticsClient;
import ru.gorkycode.ngtu.sportline.business.auth.AuthService;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

/**
 * @author Egor Bokov
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final AnalyticsClient analyticsClient;
    private final AuthService authService;

    public StatisticsDto getStatistics(StatisticsPeriod period) {
        User currentUser = authService.getCurrentUser();

        GetStatisticsDto dto = GetStatisticsDto
                .builder()
                .userId(currentUser.getId())
                .period(period)
                .build();
        return analyticsClient.getStatistics(dto);
    }
}
