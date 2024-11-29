import React, { useState, useEffect } from "react";
import "./StatisticsPage.css";

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState(null); // Данные статистики
    const [selectedPeriod, setSelectedPeriod] = useState("DAY"); // Текущий выбранный период
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Ошибки

    const fetchStatistics = async (period) => {
        try {
            setLoading(true);
            setError(null);

            const storedData = JSON.parse(localStorage.getItem("user"));
            if (!storedData) {
                throw new Error("Пользователь не найден в localStorage");
            }

            const userId = storedData.id; // Извлекаем id пользователя
            const token = storedData.token; // Извлекаем токен авторизации

            if (!token) {
                throw new Error("Токен авторизации отсутствует");
            }

            // Формируем URL с параметром запроса
            const url = `/api/v1/user/statistics?period=${period}`;

            console.log("Отправляем запрос с URL:", url);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId, // В теле запроса оставляем только userId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Ответ сервера с ошибкой:", errorData);
                throw new Error(errorData.message || `Ошибка: ${response.status}`);
            }

            const data = await response.json();
            console.log("Полученные данные статистики:", data);
            setStatistics(data);
        } catch (err) {
            console.error("Ошибка при загрузке статистики:", err.message);
            setError(err.message || "Произошла ошибка");
        } finally {
            setLoading(false);
        }
    };

    // Обновляем статистику при изменении периода
    useEffect(() => {
        fetchStatistics(selectedPeriod);
    }, [selectedPeriod]);

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period); // Устанавливаем выбранный период
    };

    return (
        <div className="user-statistics-container">
            <h1>Статистика пользователя</h1>

            {/* Кнопки переключения периода */}
            <div className="period-buttons">
                {["DAY", "WEEK", "MONTH", "YEAR"].map((period) => (
                    <button
                        key={period}
                        className={`period-button ${
                            selectedPeriod === period ? "active" : ""
                        }`}
                        onClick={() => handlePeriodChange(period)}
                    >
                        {period === "DAY"
                            ? "За день"
                            : period === "WEEK"
                                ? "За неделю"
                                : period === "MONTH"
                                    ? "За месяц"
                                    : "За год"}
                    </button>
                ))}
            </div>

            {/* Загрузка */}
            {loading && <p>Загрузка статистики...</p>}

            {/* Ошибка */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Статистика */}
            {statistics && (
                <div className="statistics-data">
                    <p>Пройдено шагов: {statistics.steps || 0}</p>
                    <p>Дистанция: {statistics.distance || 0} км</p>
                    <p>Калории: {statistics.calories || 0} ккал</p>
                </div>
            )}
        </div>
    );
};

export default StatisticsPage;
