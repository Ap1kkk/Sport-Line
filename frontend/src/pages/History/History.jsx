import React, { useState, useEffect } from "react";
import "./History.css"; // CSS для стилей

const History = () => {
    const [routesHistory, setRoutesHistory] = useState([]);

    useEffect(() => {
        // Загрузка истории маршрутов
        const fetchHistory = async () => {
            try {
                const response = await fetch("http://localhost:5000/routesHistory"); // Ваш API
                if (!response.ok) throw new Error("Ошибка при загрузке истории маршрутов");
                const data = await response.json();
                setRoutesHistory(groupRoutesByDate(data)); // Группируем по дате
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchHistory();
    }, []);

    // Группировка маршрутов по дате
    const groupRoutesByDate = (routes) => {
        const grouped = routes.reduce((acc, route) => {
            const date = new Date(route.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
            }); // Форматируем дату
            acc[date] = acc[date] || [];
            acc[date].push(route);
            return acc;
        }, {});
        return Object.entries(grouped); // Возвращаем массив пар [дата, маршруты]
    };

    return (
        <div className="history-container">
            <h1 className="history-title">История</h1>
            {routesHistory.length === 0 ? (
                <p>История маршрутов пуста</p>
            ) : (
                routesHistory.map(([date, routes]) => (
                    <div key={date} className="history-date-group">
                        <h2 className="history-date">{date}</h2>
                        {routes.map((route) => (
                            <div key={route.id} className="route-item">
                                <div className="route-info">
                                    <h3>{route.name}</h3>
                                    <p>{route.length} м • {route.difficulty}</p>
                                    <p>{route.categories.join(", ")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default History;
