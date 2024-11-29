package ru.gorkycode.ngtu.sportline.business.user.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
}