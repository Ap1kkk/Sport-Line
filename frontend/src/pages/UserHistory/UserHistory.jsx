import React, { useState, useEffect } from "react";
import "./UserHistory.css";

const UserHistory = () => {
    const [historyRoutes, setHistoryRoutes] = useState([]); // История маршрутов
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Ошибка загрузки

    useEffect(() => {
        const fetchHistoryRoutes = async () => {
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
                    throw new Error("Ошибка загрузки истории маршрутов пользователя");
                }

                const data = await response.json();
                setHistoryRoutes(data);
            } catch (error) {
                console.error("Ошибка:", error);
                setError("Не удалось загрузить историю маршрутов");
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryRoutes();
    }, []);

    // Сокращение текста до указанной длины
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return "Неизвестная дата";
        try {
            const options = { year: "numeric", month: "long", day: "numeric" };
            const date = new Date(dateString); // Преобразуем строку в объект Date
            return date.toLocaleDateString(undefined, options); // Локальное форматирование
        } catch (error) {
            console.error("Ошибка форматирования даты:", error);
            return "Некорректная дата";
        }
    };

    return (
        <div className="_app">
            <h1 className="_routes-title">История маршрутов</h1>

            {loading && <p>Загрузка истории маршрутов...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="_routes-list">
                {!loading && !error && historyRoutes.length === 0 && (
                    <p>Нет данных об истории маршрутов.</p>
                )}

                {!loading &&
                    !error &&
                    historyRoutes.map((route) => (
                        <div key={route.id} className="_route-card">
                            {/* Дата прохождения */}
                            <p className="_route-date">{formatDate(route.createdAt)}</p>

                            {/* Информация о маршруте */}
                            <h2 className="_route-name">{truncateText(route.name, 20)}</h2>
                            <p className="_route-details">
                                Сложность: {route.difficulty} | Дистанция: {route.distance} метров | Время: {route.duration} мин
                            </p>
                            <p className="_route-likes">Лайков: {route.likes}</p>

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

export default UserHistory;
