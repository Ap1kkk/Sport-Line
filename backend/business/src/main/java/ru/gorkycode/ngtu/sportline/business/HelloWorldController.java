package ru.gorkycode.ngtu.sportline.business;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/hello")
public class HelloWorldController {

    @GetMapping
    public String helloWorld() {
        return "Hello World";
    }
}
