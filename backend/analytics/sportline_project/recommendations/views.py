from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd
from surprise import SVD, Dataset, Reader

@csrf_exempt
def recommendations_view(request):
    if request.method == "POST":
        try:
            # Получаем тело запроса
            data = json.loads(request.body)

            # Извлекаем параметры
            user_id = data.get('userId')
            filters = data.get('filter', {})

            # Извлечение фильтров
            order = filters.get('order', 'ASC').upper()
            difficulties = filters.get('difficulties', [])
            category_ids = filters.get('categoryIds', [])
            min_duration = filters.get('durationFrom', 0)
            max_duration = filters.get('durationTo', float('inf'))
            min_distance = filters.get('distanceFrom', 0)
            max_distance = filters.get('distanceTo', float('inf'))

            # Шаг 1: Получение данных из базы
            with connection.cursor() as cursor:
                # Получаем предпочтения пользователя
                cursor.execute("""
                    SELECT category_id
                    FROM user_preferences
                    WHERE user_id = %s
                """, [user_id])
                user_categories = [row[0] for row in cursor.fetchall()]

                # Объединяем категории из предпочтений и переданных в запросе
                all_categories = set(user_categories + category_ids)

                # Получаем маршруты по категориям, расстоянию, длительности и сложности
                query = """
                    SELECT DISTINCT r.id AS route_id, r.distance, r.duration, rc.category_id
                    FROM routes r
                    JOIN route_categories rc ON r.id = rc.route_id
                    WHERE rc.category_id = ANY(%s)
                      AND r.distance BETWEEN %s AND %s
                      AND r.duration BETWEEN %s AND %s
                """
                params = [list(all_categories), min_distance, max_distance, min_duration, max_duration]

                if difficulties:
                    query += " AND r.difficulty = ANY(%s)"
                    params.append(difficulties)

                query += f" ORDER BY r.distance {order}"

                cursor.execute(query, params)
                route_data = cursor.fetchall()

            # Шаг 2: Подготовка данных для Surprise
            ratings = []
            for route_id, distance, duration, category_id in route_data:
                rating = 1  # Простой рейтинг: 1 для подходящих маршрутов
                ratings.append((user_id, route_id, rating))

            # Проверяем, есть ли данные для рекомендации
            if not ratings:
                return JsonResponse({"recommendations": []})

            # Формируем набор данных для Surprise
            reader = Reader(rating_scale=(0, 1))
            data = Dataset.load_from_df(
                pd.DataFrame(ratings, columns=["user_id", "route_id", "rating"]),
                reader
            )
            trainset = data.build_full_trainset()

            # Шаг 3: Обучение модели
            model = SVD()
            model.fit(trainset)

            # Шаг 4: Генерация рекомендаций
            route_ids = [route[0] for route in route_data]
            predictions = [
                (route_id, model.predict(user_id, route_id).est)
                for route_id in route_ids
            ]
            recommendations = sorted(predictions, key=lambda x: x[1], reverse=True)

            # Оставляем только уникальные маршруты
            recommended_ids = list(dict.fromkeys([route_id for route_id, _ in recommendations]))

            # Шаг 5: Возвращаем JSON с ID маршрутов
            return JsonResponse({"recommendations": recommended_ids})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
