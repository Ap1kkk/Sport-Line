package ru.gorkycode.ngtu.sportline.business.region;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface RegionRepository extends JpaRepository<Region, Long> {
}