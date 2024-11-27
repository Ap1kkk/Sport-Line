package ru.gorkycode.ngtu.sportline.business.routes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.proxy.HibernateProxy;
import ru.gorkycode.ngtu.sportline.business.category.Category;
import ru.gorkycode.ngtu.sportline.business.checkpoint.Checkpoint;
import ru.gorkycode.ngtu.sportline.business.common.BaseEntity;
import ru.gorkycode.ngtu.sportline.business.file.enums.ApplicationTargetDirectory;
import ru.gorkycode.ngtu.sportline.business.file.image.Image;
import ru.gorkycode.ngtu.sportline.business.file.image.handler.ImageToHandle;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

/**
 * @author Egor Bokov
 */
@Entity
@Table(name = "routes")
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Route extends BaseEntity {

    @Column
    private String name;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column
    private RouteDifficulty difficulty;

    @Column
    private Long distance;

    @Column
    private Long duration;

    @Column
    @Builder.Default
    private Long likes = 0L;

    @Column(name = "created_at")
    private ZonedDateTime createdAt = ZonedDateTime.now();

    // Relationships

    @OneToMany
    @JoinTable(
            name = "route_categories",
            joinColumns = @JoinColumn(
                    name = "route_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "category_id",
                    referencedColumnName = "id"
            )
    )
    @ToString.Exclude
    private List<Category> categories;

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Checkpoint> checkpoints;

    @ImageToHandle(
            id = "image",
            directory = ApplicationTargetDirectory.Values.ACHIEVEMENTS_IMAGES_VALUE
    )
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "route_images",
            joinColumns = @JoinColumn(
                    name = "route_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "image_id",
                    referencedColumnName = "id"
            )
    )
    @ToString.Exclude
    private Image image;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Route route = (Route) o;
        return getId() != null && Objects.equals(getId(), route.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}