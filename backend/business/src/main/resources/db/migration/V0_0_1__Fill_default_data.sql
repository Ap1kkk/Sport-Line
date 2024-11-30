INSERT INTO regions(name) VALUES ('Нижегородский район');
INSERT INTO regions(name) VALUES ('Советский район');
INSERT INTO regions(name) VALUES ('Автозаводский район');
INSERT INTO regions(name) VALUES ('Московский район');
INSERT INTO regions(name) VALUES ('Канавинский район');
INSERT INTO regions(name) VALUES ('Сормовский район');

INSERT INTO achievements(id, name, description, goal) VALUES (1, 'Первопроходец', 'Завершить 1 маршрут', 0);
INSERT INTO achievements(id, name, description, goal) VALUES (2, 'Город под подошвой', 'Завершить 20 маршрутов', 0);
INSERT INTO achievements(id, name, description, goal) VALUES (3, 'Машина', 'Пройти 15 км за день', 0);
INSERT INTO achievements(id, name, description, goal) VALUES (4, 'Марафонец', 'Пройти 42 км за все время', 0);
INSERT INTO achievements(id, name, description, goal) VALUES (5, 'Я - скорость', 'Побить личный рекорд маршрута', 0);
INSERT INTO achievements(id, name, description, goal) VALUES (6, 'Спидранер', 'Пройти 3 маршрута за день', 0);

INSERT INTO user_activity(name) VALUES ('Школьник');
INSERT INTO user_activity(name) VALUES ('В полном расцвете сил');
INSERT INTO user_activity(name) VALUES ('Пенсионер');

INSERT INTO user_avatars(id, path) VALUES (1, '/avatars/avatar1.png');
INSERT INTO user_avatars(id, path) VALUES (2, '/avatars/avatar2.png');
INSERT INTO user_avatars(id, path) VALUES (3, '/avatars/avatar3.png');
INSERT INTO user_avatars(id, path) VALUES (4, '/avatars/avatar4.png');
INSERT INTO user_avatars(id, path) VALUES (5, '/avatars/avatar5.png');
INSERT INTO user_avatars(id, path) VALUES (6, '/avatars/avatar6.png');
INSERT INTO user_avatars(id, path) VALUES (7, '/avatars/avatar7.png');
INSERT INTO user_avatars(id, path) VALUES (8, '/avatars/avatar8.png');

INSERT INTO
    users(
        username,
        email,
        gender,
        region_id,
        birthday,
        activity_id,
        avatar_id,
        password,
        role,
        created_at
)
VALUES (
        'User',
        'user@mail.ru',
        'MALE',
        1,
        '11-11-1990',
        1,
        1,
        '$2a$12$l4XNiFWEdstG4CE1L3jvEe2nYeaKwNb0PnuBzcHuFfdquNUXyx/qG',
        'USER',
        CURRENT_TIMESTAMP
);

INSERT INTO
    users(
        username,
        email,
        gender,
        region_id,
        birthday,
        activity_id,
        avatar_id,
        password,
        role,
        created_at
)
VALUES (
        'Admin',
        'admin@mail.ru',
        'MALE',
        1,
        '11-11-1990',
        1,
        1,
        '$2a$12$l4XNiFWEdstG4CE1L3jvEe2nYeaKwNb0PnuBzcHuFfdquNUXyx/qG',
        'ADMIN',
        CURRENT_TIMESTAMP
);

INSERT INTO categories(name) VALUES ('Прогулка');
INSERT INTO categories(name) VALUES ('Пробежка');
INSERT INTO categories(name) VALUES ('Велосипед');
INSERT INTO categories(name) VALUES ('Самокат');
INSERT INTO categories(name) VALUES ('Ролики');
INSERT INTO categories(name) VALUES ('С питомцем');
INSERT INTO categories(name) VALUES ('Утренняя прогулка');
INSERT INTO categories(name) VALUES ('Вечерний маршрут');
INSERT INTO categories(name) VALUES ('Ночной маршрут');
INSERT INTO categories(name) VALUES ('По заповеднику');
INSERT INTO categories(name) VALUES ('По набережной');
INSERT INTO categories(name) VALUES ('По стрит-арту');
INSERT INTO categories(name) VALUES ('По достопримечательностям');

INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Изумрудное прямой', 'EASY', 352, 5, 10, CURRENT_TIMESTAMP, 'test1');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Иземрудное короткий', 'EASY', 277, 5, 10, CURRENT_TIMESTAMP, 'test2');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Изумрудное с поворотами', 'EASY', 371, 5, 10, CURRENT_TIMESTAMP, 'test3');

INSERT INTO route_categories (route_id, category_id) VALUES (1, 1);
INSERT INTO route_categories (route_id, category_id) VALUES (1, 2);
INSERT INTO route_categories (route_id, category_id) VALUES (1, 3);
INSERT INTO route_categories (route_id, category_id) VALUES (2, 4);
INSERT INTO route_categories (route_id, category_id) VALUES (2, 5);
INSERT INTO route_categories (route_id, category_id) VALUES (2, 6);
INSERT INTO route_categories (route_id, category_id) VALUES (3, 7);
INSERT INTO route_categories (route_id, category_id) VALUES (3, 8);
INSERT INTO route_categories (route_id, category_id) VALUES (3, 9);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (1, 0, 56.804317474365234, 43.34415817260742);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (1, 1, 56.80705261230469, 43.34344482421875);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 0, 56.8043327331543, 43.3441162109375);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 1, 56.804691314697266, 43.34492874145508);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 2, 56.804691314697266, 43.34492874145508);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 0, 56.804691314697266, 43.34489059448242);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 1, 56.803646087646484, 43.34492874145508);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 2, 56.80421447753906, 43.347389221191406);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 2, 56.80527877807617, 43.34663391113281);