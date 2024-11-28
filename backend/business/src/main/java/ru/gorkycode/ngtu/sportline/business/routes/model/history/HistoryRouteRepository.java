package ru.gorkycode.ngtu.sportline.business.routes.model.history;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface HistoryRouteRepository extends JpaRepository<HistoryRoute, Long> {
    Optional<HistoryRoute> findByUser_IdAndRoute_Id(Long userId, Long routeId);
}