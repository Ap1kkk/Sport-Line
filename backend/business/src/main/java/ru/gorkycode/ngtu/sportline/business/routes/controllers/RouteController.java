package ru.gorkycode.ngtu.sportline.business.routes.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.routes.RouteFaker;
import ru.gorkycode.ngtu.sportline.business.routes.services.RouteService;
import ru.gorkycode.ngtu.sportline.business.routes.jpa.RouteFilter;

import java.util.List;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/route")
@RequiredArgsConstructor
public class RouteController {

    private final RouteFaker routeFaker;
    private final RouteService routeService;

    @GetMapping("/by-id")
    public Route getById(@RequestParam Long id) {
        return routeService.getById(id);
    }

    @GetMapping("/filter")
    public List<Route> getAll(@RequestBody RouteFilter filter) {
        return routeService.getFilteredRoutes(filter);
    }

    @GetMapping("/daily")
    public Route getDaily() {
        return routeService.getDaily();
    }

    @GetMapping("/popular")
    public List<Route> getPopular(@RequestParam int limit) {
        return routeService.getPopular(limit);
    }

    @GetMapping("/popular-filtered")
    public List<Route> getPopularWithFilter(@RequestBody RouteFilter filter, @RequestParam int limit) {
        return routeService.getPopularFiltered(filter, limit);
    }

    @GetMapping("/recommended")
    public List<Route> getRecommended() {
        return routeFaker.get(5, 10);
    }
}
