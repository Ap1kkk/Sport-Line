package ru.gorkycode.ngtu.sportline.business.checkpoint;

import net.datafaker.Faker;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Egor Bokov
 */
@Component
public class CheckpointFaker {

    private final Faker faker = new Faker();

    public Checkpoint get() {
        return Checkpoint
                .builder()
                .id(faker.random().nextLong())
                .index(faker.random().nextInt())
                .latitude(Float.parseFloat(faker.address().latitude()))
                .longitude(Float.parseFloat(faker.address().longitude()))
                .build();
    }

    public List<Checkpoint> get(int min, int max) {
        List<Checkpoint> checkpoints = new ArrayList<>();

        for (int i = 0; i < faker.random().nextInt(min, max); i++) {
            checkpoints.add(get());
        }

        return checkpoints;
    }
}
