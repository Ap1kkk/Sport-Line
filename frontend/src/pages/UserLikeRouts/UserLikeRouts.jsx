import React, { useState, useEffect } from "react";
import "./UserLikeRouts.css";

const UserLikeRoutes = () => {
    const [likedRoutes, setLikedRoutes] = useState([]); // Любимые маршруты
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Ошибка загрузки

    useEffect(() => {
        const fetchLikedRoutes = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    throw new Error("Отсутствует токен авторизации");
                }

                const response = await fetch("http://localhost:8080/api/v1/user/routes/history", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Ошибка загрузки любимых маршрутов пользователя");
                }

                const data = await response.json();
                setLikedRoutes(data);
            } catch (error) {
                console.error("Ошибка:", error);
                setError("Не удалось загрузить любимые маршруты");
            } finally {
                setLoading(false);
            }
        };

        fetchLikedRoutes();
    }, []);

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div className="_app">
            <h1 className="_routes-title">Любимые маршруты</h1>

            {loading && <p>Загрузка маршрутов...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="_routes-list">
                {!loading && !error && likedRoutes.length === 0 && (
                    <p>Нет любимых маршрутов для отображения.</p>
                )}

                {!loading &&
                    !error &&
                    likedRoutes.map((route) => (
                        <div key={route.id} className="_route-card">
                            {/* Название маршрута */}
                            <h2 className="_route-name">{truncateText(route.name, 20)}</h2>

                            {/* Описание маршрута */}
                            <p className="_route-description">{truncateText(route.description, 50)}</p>

                            {/* Сложность маршрута */}
                            <p className="_route-difficulty">Сложность: {route.difficulty}</p>

                            {/* Категории маршрута */}
                            <p className="_route-categories">
                                Категории:{" "}
                                {route.categories && route.categories.length > 0
                                    ? route.categories.map((category) => category.name).join(", ")
                                    : "Нет категорий"}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UserLikeRoutes;
