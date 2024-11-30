import React, { useEffect, useState } from "react";
import "./PopularFilteredRoutes.css";
import { BASE_API_URL, BASE_STATIC_URL } from "../../../constants/globals";

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
                    ? `${BASE_API_URL}/route/search?query=${encodeURIComponent(searchQuery)}`
                    : `${BASE_API_URL}/route/popular-filtered?limit=10`;

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
                        <img src={BASE_STATIC_URL + route.image || "/default-image.jpg"} alt={route.name} />
                        <div className="route-info">
                            <h2>{route.name}</h2>
                            <p>Расстояние: {route.distance} м</p>
                            <p>Сложность: {route.difficulty}</p>
                            <div className="categories">
                                {route.categories && route.categories.length > 0
                                    ? route.categories.map((cat) => (
                                        <span key={cat.id}>{cat.name}</span>
                                    ))
                                    : <span>Нет категорий</span>}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PopularFilteredRoutes;
