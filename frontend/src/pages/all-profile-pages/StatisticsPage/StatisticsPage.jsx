import React, { useState, useEffect } from "react";
import "./StatisticsPage.css";

const USER_STATISTIC_URL = "http://localhost:8080/api/v1/user/statistics";

const StatCard = ({ title, value }) => {
    return (
        <div className="stat-card">
            <h3 className="stat-card-title">{title}</h3>
            <p className="stat-card-value-container">{value}</p>
        </div>
    );
};

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState("");

    useEffect(() => {
        const fetchStatistics = async () => {
                const user = JSON.parse(localStorage.getItem("user")); // Парсинг строки в объект
                const response = await fetch(USER_STATISTIC_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setStatistics(data);
        };
        fetchStatistics();
    }, []);


    if (!statistics) {
        return <div>Загрузка статистики...</div>;
    }

    return (
        <div className="statistics-container">
            <h1 className="statistics-title">Статистика</h1>
            <div className="statistics-grid">
                <StatCard title="Всего пройдено метров" value={statistics.totalDistance || 0}/>
                <StatCard title="Всего пройдено шагов" value={statistics.totalSteps || 0}/>
                <StatCard title="Общее время пройденных маршрутов" value={statistics.totalDuration || "0д 0ч 0м"}/>
                <StatCard title="Среднее время прохождения маршрутов" value={statistics.averageRouteDuration || "N/A"}/>
                <StatCard title="Количество Завершенных маршрутов" value={statistics.travelledRoutesCount || 0}/>
                <StatCard title="Число пройденных чекпоинтов" value={statistics.totalCheckpoints || 0}/>
                <StatCard title="Число понравившихся маршрутов" value={statistics.favouriteRoutesCount || 0}/>
                <StatCard title="Среняя длина пройденных маршрутов" value={statistics.averageRouteDistance || 0}/>
            </div>
            <div className="bottom-spacer"></div>
        </div>
    );
};

export default StatisticsPage;
