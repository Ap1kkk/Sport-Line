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

    @GetMapping("/search")
    public List<Route> getAll(@RequestBody RouteFilter filter, @RequestParam String query) {
        return routeService.search(query, filter);
    }

    @GetMapping("/filter")
    public List<Route> getFiltered(@RequestBody RouteFilter filter) {
        return routeService.getFilteredRoutes(filter);
    }

    @GetMapping("/daily")
    public Route getDaily() {
        return routeService.getDaily();
    }

    @PostMapping("/popular")
    public List<Route> getPopular(@RequestParam int limit) {
        return routeService.getPopular(limit);
    }

    @PostMapping("/popular-filtered")
    public List<Route> getPopularWithFilter(@RequestParam int limit, @RequestBody RouteFilter filter) {
        return routeService.getPopularFiltered(filter, limit);
    }

    @PostMapping("/recommended")
    public List<Route> getRecommended(@RequestParam int limit) {
        return routeFaker.get(5, 10);
    }

    @PostMapping("/recommended")
    public List<Route> getRecommended(@RequestParam int limit, @RequestBody RouteFilter filter) {
        return routeFaker.get(5, 10);
    }
}
