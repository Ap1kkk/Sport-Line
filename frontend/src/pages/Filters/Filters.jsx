import React, { useState, useEffect } from "react";
import FilterPanel from "./FilterPanel/FilterPanel";
import FilteredRoutes from "./FilteredRoutes/FilteredRoutes";
import "./Filters.css";

const Filters = () => {
    const [sportRoutes, setSportRoutes] = useState([]); // Все маршруты
    const [filteredRoutes, setFilteredRoutes] = useState([]); // Отфильтрованные маршруты
    const [filters, setFilters] = useState({
        timeRange: [0, 100],
        lengthRange: [0, 100],
        difficulty: [],
        categories: [],
    });
    const [searchQuery, setSearchQuery] = useState(""); // Запрос поиска
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    // Загрузка маршрутов при монтировании
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch("http://localhost:5000/SportRoutes");
                if (!response.ok) throw new Error("Ошибка загрузки маршрутов");
                const data = await response.json();
                setSportRoutes(data);
                setFilteredRoutes(data); // Изначально показываем все маршруты
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchRoutes();
    }, []);

    // Применение фильтров
    const applyFilters = (newFilters) => {
        const filtered = sportRoutes.filter((route) => {
            const matchesFilters =
                newFilters.difficulty.includes(route.difficulty) &&
                route.time >= newFilters.timeRange[0] &&
                route.time <= newFilters.timeRange[1] &&
                route.length >= newFilters.lengthRange[0] &&
                route.length <= newFilters.lengthRange[1] &&
                (newFilters.categories.length === 0 || newFilters.categories.includes(route.category));

            const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilters && matchesSearch;
        });

        setFilteredRoutes(filtered);
        setFilters(newFilters); // Сохранение новых фильтров
    };

    // Сброс фильтров
    const resetFilters = () => {
        const defaultFilters = {
            timeRange: [0, 100],
            lengthRange: [0, 100],
            difficulty: [],
            categories: [],
        };
        setFilters(defaultFilters);
        setSearchQuery(""); // Очистка строки поиска
        setFilteredRoutes(sportRoutes); // Показать все маршруты
    };

    // Обработка поиска
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = sportRoutes.filter((route) => {
            const matchesFilters =
                filters.difficulty.includes(route.difficulty) &&
                route.time >= filters.timeRange[0] &&
                route.time <= filters.timeRange[1] &&
                route.length >= filters.lengthRange[0] &&
                route.length <= filters.lengthRange[1] &&
                (filters.categories.length === 0 || filters.categories.includes(route.category));

            const matchesSearch = route.name.toLowerCase().includes(query.toLowerCase());
            return matchesFilters && matchesSearch;
        });

        setFilteredRoutes(filtered);
    };

    return (
        <div className="app">
            <h1 className="routes-title">Рекомендуемые</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Поиск маршрутов по названию..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            {/* Панель фильтров */}
            <FilterPanel
                isOpen={isFilterPanelOpen}
                filters={filters}
                onApply={applyFilters}
                onReset={resetFilters}
                onClose={() => setIsFilterPanelOpen(false)}
            />

            {/* Кнопки управления */}
            <div className="filter-controls">
                <span onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}>
                    Фильтр
                </span>
            </div>

            {/* Поле поиска */}

            {/* Вывод отфильтрованных маршрутов */}
            <FilteredRoutes routes={filteredRoutes} />
        </div>
    );
};

export default Filters;
