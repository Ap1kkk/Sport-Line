import json
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now, timedelta

@csrf_exempt
def get_user_statistics(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)

    try:
        # Извлекаем JSON из тела запроса
        data = json.loads(request.body)
        user_id = data.get('userId')
        period = data.get('period')

        if not user_id or not period:
            return JsonResponse({'error': 'Missing user_id or period in request.'}, status=400)

        # Определяем начало и конец периода
        end_date = now()
        if period == 'DAY':
            start_date = end_date - timedelta(days=1)
        elif period == 'WEEK':
            start_date = end_date - timedelta(weeks=1)
        elif period == 'MONTH':
            start_date = end_date - timedelta(days=30)
        elif period == 'YEAR':
            start_date = end_date - timedelta(days=365)
        else:
            return JsonResponse({'error': 'Invalid period. Use DAY, WEEK, MONTH, or YEAR.'}, status=400)

        # SQL-запрос для сбора статистики
        query = """
        SELECT 
            COALESCE(SUM(r.distance), 0) AS total_distance,
            COALESCE(SUM(r.distance) / 0.75, 0) AS total_steps,
            COALESCE(SUM(r.duration), 0) AS total_duration,
            COALESCE(SUM(c.count), 0) AS total_checkpoints,
            COALESCE(AVG(r.distance), 0) AS average_route_distance,
            COALESCE(AVG(r.duration), 0) AS average_route_duration,
            COALESCE(( 
                SELECT COUNT(*) 
                FROM user_favourite_routes ufr
                WHERE ufr.user_id = %s
            ), 0) AS favourite_routes_count,
            COALESCE(COUNT(urh.id), 0) AS travelled_routes_count,
            COALESCE(SUM(CASE WHEN urh.status != 'completed' THEN 1 ELSE 0 END), 0) AS incomplete_routes
        FROM user_routes_history urh
        LEFT JOIN routes r ON urh.route_id = r.id
        LEFT JOIN (
            SELECT route_id, COUNT(*) AS count
            FROM checkpoints
            GROUP BY route_id
        ) c ON r.id = c.route_id
        WHERE urh.user_id = %s AND urh.started_at BETWEEN %s AND %s;
        """

        # Выполняем запрос к базе данных
        with connection.cursor() as cursor:
            cursor.execute(query, [user_id, user_id, start_date, end_date])
            row = cursor.fetchone()

        # Формируем JSON-ответ с целыми числами
        response_data = {
            "totalDistance": int(row[0]),
            "totalSteps": int(row[1]),
            "totalDuration": int(row[2]),
            "totalCheckpoints": int(row[3]),
            "averageRouteDistance": int(row[4]),
            "averageRouteDuration": int(row[5]),
            "favouriteRoutesCount": int(row[6]),
            "travelledRoutesCount": int(row[7]),
            "incompleteRoutes": int(row[8])
        }

        return JsonResponse(response_data)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=255)
