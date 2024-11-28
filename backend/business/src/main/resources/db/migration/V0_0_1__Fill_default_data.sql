INSERT INTO
    users(
          username,
          email,
          avatar,
          password,
          role,
          created_at
)
VALUES (
        'User',
        'user@mail.ru',
        0,
        '$2a$12$l4XNiFWEdstG4CE1L3jvEe2nYeaKwNb0PnuBzcHuFfdquNUXyx/qG',
        'USER',
        CURRENT_TIMESTAMP
);

INSERT INTO
    users(
        username,
        email,
        avatar,
        password,
        role,
        created_at
)
VALUES (
       'Admin',
       'admin@mail.ru',
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
    VALUES ('Маршрут #1', 'EASY', 1600, 40, 50, CURRENT_TIMESTAMP, 'Duis eget risus mi. Sed tincidunt lobortis dolor sit amet suscipit. Donec accumsan quis turpis at placerat. Maecenas id magna vel mi viverra eleifend vitae eu arcu. Nunc pulvinar odio a velit facilisis posuere. Quisque sodales sapien sed tortor efficitur, a mattis metus mattis. Aliquam eleifend lectus ut nibh hendrerit, vitae vulputate magna pellentesque. Praesent risus nisl, iaculis ut convallis non, vestibulum nec arcu. Praesent mattis ullamcorper odio, sed aliquam sapien porta vitae. Nulla molestie aliquam arcu at laoreet. Ut vitae velit eget lorem auctor dictum. Vestibulum turpis orci, dignissim et neque sit amet, feugiat facilisis diam. Aliquam est risus, rhoncus non pharetra at, lobortis quis odio. Morbi in ornare mauris.');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Маршрут #2', 'MEDIUM', 2600, 60, 100, CURRENT_TIMESTAMP, 'Duis eget risus mi. Sed tincidunt lobortis dolor sit amet suscipit. Donec accumsan quis turpis at placerat. Maecenas id magna vel mi viverra eleifend vitae eu arcu. Nunc pulvinar odio a velit facilisis posuere. Quisque sodales sapien sed tortor efficitur, a mattis metus mattis. Aliquam eleifend lectus ut nibh hendrerit, vitae vulputate magna pellentesque. Praesent risus nisl, iaculis ut convallis non, vestibulum nec arcu. Praesent mattis ullamcorper odio, sed aliquam sapien porta vitae. Nulla molestie aliquam arcu at laoreet. Ut vitae velit eget lorem auctor dictum. Vestibulum turpis orci, dignissim et neque sit amet, feugiat facilisis diam. Aliquam est risus, rhoncus non pharetra at, lobortis quis odio. Morbi in ornare mauris.');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Маршрут #3', 'HARD', 3600, 80, 150, CURRENT_TIMESTAMP, 'Duis eget risus mi. Sed tincidunt lobortis dolor sit amet suscipit. Donec accumsan quis turpis at placerat. Maecenas id magna vel mi viverra eleifend vitae eu arcu. Nunc pulvinar odio a velit facilisis posuere. Quisque sodales sapien sed tortor efficitur, a mattis metus mattis. Aliquam eleifend lectus ut nibh hendrerit, vitae vulputate magna pellentesque. Praesent risus nisl, iaculis ut convallis non, vestibulum nec arcu. Praesent mattis ullamcorper odio, sed aliquam sapien porta vitae. Nulla molestie aliquam arcu at laoreet. Ut vitae velit eget lorem auctor dictum. Vestibulum turpis orci, dignissim et neque sit amet, feugiat facilisis diam. Aliquam est risus, rhoncus non pharetra at, lobortis quis odio. Morbi in ornare mauris.');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Маршрут #4', 'EASY', 1200, 30, 30, CURRENT_TIMESTAMP, 'Duis eget risus mi. Sed tincidunt lobortis dolor sit amet suscipit. Donec accumsan quis turpis at placerat. Maecenas id magna vel mi viverra eleifend vitae eu arcu. Nunc pulvinar odio a velit facilisis posuere. Quisque sodales sapien sed tortor efficitur, a mattis metus mattis. Aliquam eleifend lectus ut nibh hendrerit, vitae vulputate magna pellentesque. Praesent risus nisl, iaculis ut convallis non, vestibulum nec arcu. Praesent mattis ullamcorper odio, sed aliquam sapien porta vitae. Nulla molestie aliquam arcu at laoreet. Ut vitae velit eget lorem auctor dictum. Vestibulum turpis orci, dignissim et neque sit amet, feugiat facilisis diam. Aliquam est risus, rhoncus non pharetra at, lobortis quis odio. Morbi in ornare mauris.');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Маршрут #5', 'MEDIUM', 2200, 50, 60, CURRENT_TIMESTAMP, 'Duis eget risus mi. Sed tincidunt lobortis dolor sit amet suscipit. Donec accumsan quis turpis at placerat. Maecenas id magna vel mi viverra eleifend vitae eu arcu. Nunc pulvinar odio a velit facilisis posuere. Quisque sodales sapien sed tortor efficitur, a mattis metus mattis. Aliquam eleifend lectus ut nibh hendrerit, vitae vulputate magna pellentesque. Praesent risus nisl, iaculis ut convallis non, vestibulum nec arcu. Praesent mattis ullamcorper odio, sed aliquam sapien porta vitae. Nulla molestie aliquam arcu at laoreet. Ut vitae velit eget lorem auctor dictum. Vestibulum turpis orci, dignissim et neque sit amet, feugiat facilisis diam. Aliquam est risus, rhoncus non pharetra at, lobortis quis odio. Morbi in ornare mauris.');
INSERT INTO routes(name, difficulty, distance, duration, likes, created_at, description)
    VALUES ('Маршрут #6', 'HARD', 3200, 70, 90, CURRENT_TIMESTAMP, 'Duis eget risus mi. Sed tincidunt lobortis dolor sit amet suscipit. Donec accumsan quis turpis at placerat. Maecenas id magna vel mi viverra eleifend vitae eu arcu. Nunc pulvinar odio a velit facilisis posuere. Quisque sodales sapien sed tortor efficitur, a mattis metus mattis. Aliquam eleifend lectus ut nibh hendrerit, vitae vulputate magna pellentesque. Praesent risus nisl, iaculis ut convallis non, vestibulum nec arcu. Praesent mattis ullamcorper odio, sed aliquam sapien porta vitae. Nulla molestie aliquam arcu at laoreet. Ut vitae velit eget lorem auctor dictum. Vestibulum turpis orci, dignissim et neque sit amet, feugiat facilisis diam. Aliquam est risus, rhoncus non pharetra at, lobortis quis odio. Morbi in ornare mauris.');

INSERT INTO route_categories (route_id, category_id) VALUES (1, 1);
INSERT INTO route_categories (route_id, category_id) VALUES (1, 2);
INSERT INTO route_categories (route_id, category_id) VALUES (2, 3);
INSERT INTO route_categories (route_id, category_id) VALUES (2, 4);
INSERT INTO route_categories (route_id, category_id) VALUES (3, 5);
INSERT INTO route_categories (route_id, category_id) VALUES (3, 6);
INSERT INTO route_categories (route_id, category_id) VALUES (4, 7);
INSERT INTO route_categories (route_id, category_id) VALUES (4, 8);
INSERT INTO route_categories (route_id, category_id) VALUES (5, 9);
INSERT INTO route_categories (route_id, category_id) VALUES (5, 10);
INSERT INTO route_categories (route_id, category_id) VALUES (6, 11);
INSERT INTO route_categories (route_id, category_id) VALUES (6, 12);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (1, 0, 56.321010361401854, 44.017490434393295);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (1, 1, 56.321535004258266, 44.02564434979856);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (1, 2, 56.32243952731985, 44.03452934787452);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (1, 3, 56.3247440056495, 44.03564849478144);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 0, 56.321010361401854, 44.017490434393295);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 1, 56.321535004258266, 44.02564434979856);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 2, 56.32243952731985, 44.03452934787452);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (2, 3, 56.3247440056495, 44.03564849478144);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 0, 56.321010361401854, 44.017490434393295);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 1, 56.321535004258266, 44.02564434979856);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 2, 56.32243952731985, 44.03452934787452);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (3, 3, 56.3247440056495, 44.03564849478144);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (4, 0, 56.321010361401854, 44.017490434393295);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (4, 1, 56.321535004258266, 44.02564434979856);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (4, 2, 56.32243952731985, 44.03452934787452);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (4, 3, 56.3247440056495, 44.03564849478144);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (5, 0, 56.321010361401854, 44.017490434393295);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (5, 1, 56.321535004258266, 44.02564434979856);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (5, 2, 56.32243952731985, 44.03452934787452);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (5, 3, 56.3247440056495, 44.03564849478144);

INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (6, 0, 56.321010361401854, 44.017490434393295);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (6, 1, 56.321535004258266, 44.02564434979856);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (6, 2, 56.32243952731985, 44.03452934787452);
INSERT INTO checkpoints(route_id, index, latitude, longitude)
    VALUES (6, 3, 56.3247440056495, 44.03564849478144);
