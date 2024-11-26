CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE images (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_order   INTEGER NOT NULL,
    path            TEXT    NOT NULL
);

CREATE TABLE images_to_clean (
    id          BIGSERIAL,
    image_id    UUID,
    PRIMARY KEY (id, image_id),
    FOREIGN KEY (image_id)
        REFERENCES images(id)
        ON DELETE CASCADE
);

CREATE TABLE categories (
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR
);

CREATE TABLE routes (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR,
    description TEXT,
    difficulty  VARCHAR,
    distance    BIGINT,
    duration    BIGINT,
    created_at  TIMESTAMP WITH TIME ZONE
);

CREATE TABLE checkpoints (
    id          BIGSERIAL PRIMARY KEY,
    route_id    BIGSERIAL,
    index       INT,
    longitude   FLOAT,
    latitude    FLOAT,
    FOREIGN KEY (route_id) REFERENCES routes(id)
);

CREATE TABLE route_images (
    image_id    UUID,
    route_id    BIGSERIAL,
    PRIMARY KEY (image_id, route_id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (route_id) REFERENCES routes(id)
);

CREATE TABLE route_categories (
    route_id    BIGSERIAL,
    category_id BIGSERIAL,
    PRIMARY KEY (route_id, category_id),
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE achievements (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR,
    description TEXT,
    goal        BIGINT
);

CREATE TABLE achievement_images (
    image_id            UUID,
    achievement_id      BIGSERIAL,
    PRIMARY KEY (image_id, achievement_id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
);

CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    username    VARCHAR,
    email       VARCHAR,
    avatar      SMALLINT,
    password    VARCHAR,
    role        VARCHAR,
    created_at  TIMESTAMP WITH TIME ZONE
);

CREATE TABLE user_preferences (
    user_id     BIGSERIAL,
    category_id BIGSERIAL,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE user_achievements (
    user_id         BIGSERIAL,
    achievement_id  BIGSERIAL,
    progress        BIGINT,
    PRIMARY KEY (user_id, achievement_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
);

CREATE TABLE user_favourite_routes (
    user_id     BIGSERIAL,
    route_id    BIGSERIAL,
    PRIMARY KEY (user_id, route_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (route_id) REFERENCES routes(id)
);

CREATE TABLE user_travelled_routes (
    user_id     BIGSERIAL,
    route_id    BIGSERIAL,
    done_at     TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, route_id, done_at),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (route_id) REFERENCES routes(id)
);