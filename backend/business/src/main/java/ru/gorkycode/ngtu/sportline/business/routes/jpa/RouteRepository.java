package ru.gorkycode.ngtu.sportline.business.routes.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.gorkycode.ngtu.sportline.business.routes.Route;

@RepositoryRestResource(exported = false)
public interface RouteRepository extends JpaRepository<Route, Long>, JpaSpecificationExecutor<Route> {

    @Query("SELECT MIN(r.id) FROM Route r")
    Long findMinimumId();
}