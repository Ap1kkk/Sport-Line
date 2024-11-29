package ru.gorkycode.ngtu.sportline.business.routes.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.routes.dto.RouteDto;
import ru.gorkycode.ngtu.sportline.business.routes.services.RouteService;

import java.util.List;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/admin/route")
@RequiredArgsConstructor
public class RouteAdminController {

    private final RouteService routeService;

    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAll();
    }

    @PostMapping("/create")
    public Route create(@ModelAttribute RouteDto dto) {
        return routeService.create(dto);
    }
}
