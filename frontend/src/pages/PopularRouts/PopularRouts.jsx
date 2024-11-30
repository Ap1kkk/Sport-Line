import React, { useState, useEffect } from "react";
import FilterPopularRoutes from "./FilterPopularRoutes/FilterPopularRoutes";
import PopularFilteredRoutes from "./PopularFilteredRoutes/PopularFilteredRoutes";
import "./PopularRouts.css";

const PopularRoutes = () => {
    const [filters, setFilters] = useState({
        order: "ASC",
        difficulties: [],
        categoryIds: [],
        durationFrom: 0,
        durationTo: 2000,
        distanceFrom: 0,
        distanceTo: 4000,
    });

    const [searchQuery, setSearchQuery] = useState(""); // Текущая строка поиска
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
        <div className="popular-routes-container">
            <h1 className="routes-title">Популярные маршруты</h1>

            {/* Поисковая строка */}
            <div className="search-bar-popular">
                <input
                    type="text"
                    placeholder="Введите название маршрута"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Панель фильтрации */}
            <FilterPopularRoutes filters={filters} onApply={handleApplyFilters} />

            {/* Отображение маршрутов */}
            <PopularFilteredRoutes filters={filters} searchQuery={debouncedQuery} />
        </div>
    );
};

export default PopularRoutes;
