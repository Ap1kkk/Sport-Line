package ru.gorkycode.ngtu.sportline.business.system.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
import ru.gorkycode.ngtu.sportline.business.analytics.AnalyticsClient;

/**
 * @author Egor Bokov
 */
@Configuration
@EnableFeignClients(clients = {AnalyticsClient.class})
public class FeignConfig {
}
