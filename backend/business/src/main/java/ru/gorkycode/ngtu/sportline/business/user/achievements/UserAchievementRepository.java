package ru.gorkycode.ngtu.sportline.business.user.achievements;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(exported = false)
public interface UserAchievementRepository extends JpaRepository<UserAchievement, UserAchievementId> {
    Long countByUserId(Long userId);
    List<UserAchievement> findAllByUser_Id(Long id);

    @Query("select count(ua) from UserAchievement ua where ua.achievement.id = :achievementId and ua.user.id = :userId")
    long countAchieved(Long achievementId, Long userId);
}