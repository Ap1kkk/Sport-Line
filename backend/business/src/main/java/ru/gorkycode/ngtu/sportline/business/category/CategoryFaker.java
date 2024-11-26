package ru.gorkycode.ngtu.sportline.business.category;

import net.datafaker.Faker;
import org.springframework.stereotype.Component;
import ru.gorkycode.ngtu.sportline.business.checkpoint.Checkpoint;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Egor Bokov
 */
@Component
public class CategoryFaker {

    private final Faker faker = new Faker();

    public Category get() {
        return Category
                .builder()
                .id(faker.random().nextLong())
                .name(faker.lorem().word())
                .build();
    }

    public List<Category> get(int min, int max) {
        List<Category> checkpoints = new ArrayList<>();

        for (int i = 0; i < faker.random().nextInt(min, max); i++) {
            checkpoints.add(get());
        }

        return checkpoints;
    }
}
