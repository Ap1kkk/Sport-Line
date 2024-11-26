package ru.gorkycode.ngtu.sportline.business.routes.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.gorkycode.ngtu.sportline.business.routes.Route;
import ru.gorkycode.ngtu.sportline.business.routes.RouteDto;
import ru.gorkycode.ngtu.sportline.business.routes.RouteService;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/admin/route")
@RequiredArgsConstructor
public class RouteAdminController {

    private final RouteService routeService;

    @PostMapping("/create")
    public Route create(@RequestBody RouteDto dto) {
        return routeService.create(dto);
    }
}
