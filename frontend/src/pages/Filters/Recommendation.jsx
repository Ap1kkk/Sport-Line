import React, { useState, useEffect } from "react";
import RecommendationFilterPanel from "./FilterPanel/RecommendationFilterPanel";
import RecommendationFilteredRoutes from "./FilteredRoutes/RecommendationFilteredRoutes";
import "./Recommendation.css";

const Recommendation = () => {
    const [filters, setFilters] = useState({
        order: "ASC",
        difficulties: [],
        categoryIds: [],
        durationFrom: 0,
        durationTo: 100,
        distanceFrom: 0,
        distanceTo: 100000,
    });

    const [searchQuery, setSearchQuery] = useState(""); // Строка поиска
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Дебаунс-строка поиска

    // Дебаунсинг строки поиска
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery); // Обновляем после задержки
        }, 500); // Задержка в миллисекундах

        return () => {
            clearTimeout(handler); // Очищаем таймер при изменении searchQuery
        };
    }, [searchQuery]);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Обновляем строку поиска при вводе текста
    };

    return (
        <div className="recommendation-container">
            <h1 className="routes-title">Рекомендованные маршруты</h1>

            {/* Поисковая строка */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Введите название маршрута"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Панель фильтрации */}
            <RecommendationFilterPanel filters={filters} onApply={handleApplyFilters} />

            {/* Отображение маршрутов */}
            <RecommendationFilteredRoutes filters={filters} searchQuery={debouncedQuery} />
        </div>
    );
};

export default Recommendation;
