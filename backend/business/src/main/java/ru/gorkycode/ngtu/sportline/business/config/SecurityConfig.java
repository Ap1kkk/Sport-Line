package ru.gorkycode.ngtu.sportline.business.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.gorkycode.ngtu.sportline.business.config.properties.CorsConfigProperties;
import ru.gorkycode.ngtu.sportline.business.exceptions.handlers.AccessDeniedHandlerImpl;
import ru.gorkycode.ngtu.sportline.business.exceptions.handlers.AuthenticationEntryPointImpl;
import ru.gorkycode.ngtu.sportline.business.jwt.JwtAuthenticationFilter;
import ru.gorkycode.ngtu.sportline.business.repository.UserRepository;
import ru.gorkycode.ngtu.sportline.business.user.CustomUserDetailsService;

/**
 * @author Egor Bokov
 */
@Configuration
@EnableConfigurationProperties({
        JwtConfigProperties.class,
        CorsConfigProperties.class
})
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService userService;
    private final AccessDeniedHandlerImpl accessDeniedHandler;
    private final AuthenticationEntryPointImpl authenticationEntryPoint;

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository){
        return new CustomUserDetailsService(userRepository);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(CorsConfigProperties corsProperties) {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin(corsProperties.getAllowedOrigin());
        configuration.addAllowedHeader(corsProperties.getAllowedHeader());
        configuration.addAllowedMethod(corsProperties.getAllowedMethod());

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(corsProperties.getConfigurationPattern(), configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            CorsConfigurationSource corsConfigurationSource,
            AuthenticationProvider authenticationProvider,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) throws Exception {
        http
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .accessDeniedHandler(accessDeniedHandler)
                                .authenticationEntryPoint(authenticationEntryPoint))
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource)
                )
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((request) ->
                        request
                                .requestMatchers("/auth/login", "/auth/register", "/auth/validate")
                                .permitAll()

                                .anyRequest()
                                .permitAll()
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
