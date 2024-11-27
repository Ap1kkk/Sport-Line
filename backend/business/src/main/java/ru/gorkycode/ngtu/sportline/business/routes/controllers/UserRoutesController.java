package ru.gorkycode.ngtu.sportline.business.routes.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;
import ru.gorkycode.ngtu.sportline.business.routes.RouteFaker;

import java.util.List;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/user/routes")
@RequiredArgsConstructor
public class UserRoutesController {

    private final RouteFaker routeFaker;

    @GetMapping("/history")
    public List<Route> getPopular() {
        return routeFaker.get(5, 10);
    }

    @GetMapping("/favourite")
    public List<Route> getRecommended() {
        return routeFaker.get(5, 10);
    }


}
