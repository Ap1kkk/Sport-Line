import React, { useState, useEffect } from "react";
import "./StatisticsPage.css";
import {BASE_API_URL} from "../../../constants/globals";

const StatisticsPage = () => {
    const [period, setPeriod] = useState("WEEK");
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStatistics = async () => {
        setLoading(true);
        setError(null);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                throw new Error("Пользователь не найден в localStorage");
            }

            const userId = user.id; // Извлекаем id пользователя
            const token = user.token; // Извлекаем токен авторизации

            if (!token) {
                throw new Error("Токен авторизации отсутствует");
            }

            // Формируем URL с параметром запроса
            const url = `${BASE_API_URL}/user/statistics?period=${period}`;

            const response = await fetch(
                `${BASE_API_URL}/user/statistics?period=${period}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userId: user.id,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка загрузки статистики");
            }

            const data = await response.json();
            setStatistics(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [period]);

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
    };

    return (
        <div className="statistics-container">
            <h1 className="statistics-title">Статистика</h1>
            <div className="period-buttons">
                {["DAY", "WEEK", "MONTH", "YEAR"].map((p) => (
                    <button
                        key={p}
                        className={`period-button ${period === p ? "active" : ""}`}
                        onClick={() => handlePeriodChange(p)}
                    >
                        {p === "DAY" ? "за день" : p === "WEEK" ? "за неделю" : p === "MONTH" ? "за месяц" : "за год"}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="loading-message">Загрузка данных...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="statistics-grid">
                    <div className="statistic-item">
                        <p>Всего пройдено метров</p>
                        <span>{statistics.totalDistance || 0}</span>
                    </div>
                    <div className="statistic-item">
                        <p>Всего пройдено шагов</p>
                        <span>{statistics.totalSteps || 0}</span>
                    </div>
                    <div className="statistic-item">
                        <p>Общее время пройденных маршрутов</p>
                        <span>
                            {Math.floor(statistics.totalDuration / 1440)}д{" "}
                            {Math.floor((statistics.totalDuration % 1440) / 60)}ч{" "}
                            {statistics.totalDuration % 60}мин
                        </span>
                    </div>
                    <div className="statistic-item">
                        <p>Пройдено точек маршрута</p>
                        <span>{statistics.totalCheckpoints || 0}</span>
                    </div>
                    <div className="statistic-item">
                        <p>Средняя длина маршрутов</p>
                        <span>{statistics.averageRouteDistance || 0} м</span>
                    </div>
                    <div className="statistic-item">
                        <p>Среднее время пройденных маршрутов</p>
                        <span>
                            {Math.floor(statistics.averageRouteDuration / 60)}ч{" "}
                            {statistics.averageRouteDuration % 60}мин
                        </span>
                    </div>
                    <div className="statistic-item">
                        <p>Количество понравившихся маршрутов</p>
                        <span>{statistics.favouriteRoutesCount || 0}</span>
                    </div>
                    <div className="statistic-item">
                        <p>Пройденных маршрутов</p>
                        <span>{statistics.travelledRoutesCount || 0}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticsPage;
