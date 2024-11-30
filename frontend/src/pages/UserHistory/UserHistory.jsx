import React, { useState, useEffect } from "react";
import UserHistoryPanel from "./UserHistoryPanel/UserHistoryPanel";
import UserHistoryRouts from "./UserHistoryRouts/UserHistoryRouts";
import "./UserHistory.css";
import {BASE_API_URL} from "../../constants/globals";

const UserHistory = () => {
    const [categories, setCategories] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [filterParams, setFilterParams] = useState({
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
            setDebouncedQuery(searchQuery); // Обновляем строку после задержки
        }, 500);

        return () => {
            clearTimeout(handler); // Очищаем таймер при изменении searchQuery
        };
    }, [searchQuery]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await fetch(`${BASE_API_URL}/category/all`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (!response.ok) throw new Error("Не удалось загрузить категории маршрутов");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Ошибка при загрузке категорий:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilterParams(newFilters);
    };

    const fetchFilteredRoutes = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const endpoint = debouncedQuery
                ? `${BASE_API_URL}/route/search?query=${encodeURIComponent(debouncedQuery)}`
                : `${BASE_API_URL}/user/routes/history`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(filterParams),
            });

            if (!response.ok) throw new Error("Ошибка фильтрации маршрутов");
            const data = await response.json();
            setFilteredRoutes(data);
        } catch (error) {
            console.error("Ошибка при загрузке маршрутов:", error);
        }
    };

    useEffect(() => {
        fetchFilteredRoutes();
    }, [filterParams, debouncedQuery]);

    return (
        <div className="user-history-container">
            <h1>История маршрутов</h1>

            {/* Поисковая строка */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Введите название маршрута"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Панель фильтров */}
            <UserHistoryPanel
                categories={categories}
                onFilterChange={handleFilterChange}
                currentFilters={filterParams}
            />

            {/* Отображение маршрутов */}
            <UserHistoryRouts routes={filteredRoutes} />
        </div>
    );
};

export default UserHistory;
