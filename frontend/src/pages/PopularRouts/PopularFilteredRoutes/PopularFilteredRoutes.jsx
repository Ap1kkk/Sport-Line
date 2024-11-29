import React, { useState, useEffect } from "react";
import "./PopularFilteredRoutes.css";

const PopularFilteredRoutes = ({ filters, searchQuery }) => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    throw new Error("Отсутствует токен авторизации");
                }

                const endpoint = searchQuery
                    ? `http://localhost:8080/api/v1/route/search?query=${encodeURIComponent(searchQuery)}`
                    : "http://localhost:8080/api/v1/route/popular-filtered?limit=10";

                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(filters),
                });

                if (!response.ok) {
                    throw new Error(`Ошибка загрузки маршрутов: ${response.status}`);
                }

                const data = await response.json();
                setRoutes(data);
            } catch (error) {
                setError("Не удалось загрузить маршруты");
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [filters, searchQuery]);

    return (
        <div className="routes-container">
            {loading && <p>Загрузка маршрутов...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading &&
                !error &&
                routes.map((route) => (
                    <div key={route.id} className="route-card">
                        <h2>{route.name}</h2>
                        <p>{route.description}</p>
                        <p>
                            Время: {route.duration} ч | Дистанция: {route.distance} км | Сложность: {route.difficulty}
                        </p>
                        <p>
                            Категории:{" "}
                            {route.categories && route.categories.length > 0
                                ? route.categories.map((cat) => cat.name).join(", ")
                                : "Нет категорий"}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default PopularFilteredRoutes;
