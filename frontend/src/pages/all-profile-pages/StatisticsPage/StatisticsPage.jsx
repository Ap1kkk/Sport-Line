import React, { useState, useEffect } from "react";
import "./StatisticsPage.css";

const StatCard = ({ title, value }) => {
    return (
        <div className="stat-card">
            <h3 className="stat-card-title">{title}</h3>
            <p className="stat-card-value-container">{value}</p>
        </div>
    );
};

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
                const response = await fetch("http://localhost:5000/users/5d0e");
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
                <StatCard title="Всего пройдено метров" value={statistics.totalMeters || 0}/>
                <StatCard title="Всего пройдено шагов" value={statistics.totalSteps || 0}/>
                <StatCard title="Общее время пройденных маршрутов" value={statistics.totalTime || "0д 0ч 0м"}/>
                <StatCard title="Среднее время прохождения маршрутов" value={statistics.averageTime || "N/A"}/>
                <StatCard title="Количество Завершенных маршрутов" value={statistics.completedRoutes || 0}/>
                <StatCard title="Число пройденных чекпоинтов" value={statistics.completedCheckpoints || 0}/>
                <StatCard title="Число понравившихся маршрутов" value={statistics.numberRouteLikes || 0}/>
                <StatCard title="Среняя длина пройденных маршрутов" value={statistics.averageLengthRoutes || 0}/>
            </div>
            <div className="bottom-spacer"/>
        </div>
    );
};

export default StatisticsPage;
