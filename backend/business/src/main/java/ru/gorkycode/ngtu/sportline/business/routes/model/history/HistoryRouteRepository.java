package ru.gorkycode.ngtu.sportline.business.routes.model.history;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.Duration;
import java.time.ZonedDateTime;

@RepositoryRestResource(exported = false)
public interface HistoryRouteRepository extends JpaRepository<HistoryRoute, Long>, JpaSpecificationExecutor<HistoryRoute> {

    @Query("select count(r) from HistoryRoute r where r.status = :status and r.user.id = :userId")
    long countFinishedRoutes(long userId, HistoryRouteStatus status);

    @Query("select sum(r.route.distance) from HistoryRoute r where r.user.id = :userId")
    long getTotalDistance(Long userId);

    @Query("select sum(r.route.distance) from HistoryRoute r where r.user.id = :userId and r.finishedAt > :startOfDay")
    long getTotalDayDistance(Long userId, ZonedDateTime startOfDay);

    @Query("select count(r) from HistoryRoute r where r.delta > :delta")
    long countWhereGreaterDeltaExists(Duration delta);

    @Query("select count(r) from HistoryRoute r where r.user.id = :userId and r.finishedAt > :startOfDay")
    long countDailyRoutes(Long userId, ZonedDateTime startOfDay);
}