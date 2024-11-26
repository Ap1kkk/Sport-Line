package ru.gorkycode.ngtu.sportline.business.routes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface RouteRepository extends JpaRepository<Route, Long> {
}