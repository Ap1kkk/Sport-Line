package ru.gorkycode.ngtu.sportline.business.routes.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.routes.Route;
import ru.gorkycode.ngtu.sportline.business.routes.RouteFaker;
import ru.gorkycode.ngtu.sportline.business.routes.RouteService;

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

    @GetMapping("/popular")
    public List<Route> getPopular() {
        return routeFaker.get(5, 10);
    }

    @GetMapping("/recommended")
    public List<Route> getRecommended() {
        return routeFaker.get(5, 10);
    }

    @PostMapping("/start")
    public Route start() {
        return routeFaker.get();
    }

    @PostMapping("/finish")
    public Route finish() {
        return routeFaker.get();
    }
}
