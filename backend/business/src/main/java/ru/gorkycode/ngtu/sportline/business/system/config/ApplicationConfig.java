package ru.gorkycode.ngtu.sportline.business.system.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import ru.gorkycode.ngtu.sportline.business.system.config.properties.FileServiceConfigProperties;

/**
 * @author Egor Bokov
 */
@Configuration
@EnableConfigurationProperties({
        FileServiceConfigProperties.class
})
public class ApplicationConfig {
}
