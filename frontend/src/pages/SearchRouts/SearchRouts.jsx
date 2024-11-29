import React, { useState, useEffect } from "react";
import SearchRoutsPanel from "./SearchRoutsPanel/SearchRoutsPanel";
import SearchRoutsFiltered from "./SearchRoutsFiltered/SearchRoutsFiltered";
import "./SearchRouts.css";

const SearchRouts = () => {
    const [filters, setFilters] = useState({
        order: "ASC",
        difficulties: [],
        categoryIds: [],
        durationFrom: 0,
        durationTo: 0,
        distanceFrom: 0,
        distanceTo: 0,
    });

    const [searchQuery, setSearchQuery] = useState(""); // Строка поиска
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Дебаунс-строка поиска

    // Дебаунсинг строки поиска
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery); // Обновляем после задержки
        }, 500);

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
        <div className="search-routs-container">
            <h1 className="routes-title">Поиск маршрутов</h1>

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
            <SearchRoutsPanel filters={filters} onApply={handleApplyFilters} />

            {/* Отображение маршрутов */}
            <SearchRoutsFiltered filters={filters} searchQuery={debouncedQuery} />
        </div>
    );
};

export default SearchRouts;
