import React, { useState, useEffect } from "react";
import UserLikeRoutsPanel from "./UserLikeRoutsPanel/UserLikeRoutsPanel";
import UserLikeRoutsFiltered from "./UserLikeRoutsFiltered/UserLikeRoutsFiltered";
import "./UserLikeRouts.css";

const UserLikeRouts = () => {
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

    useEffect(() => {
        // Дебаунсинг строки поиска
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
                const response = await fetch("http://localhost:8080/api/v1/category/all", {
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
                ? `http://localhost:8080/api/v1/route/search?query=${encodeURIComponent(debouncedQuery)}`
                : "http://localhost:8080/api/v1/user/routes/favourite";

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
        <div className="user-like-routs-container">
            <h1>Избранные маршруты</h1>

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
            <UserLikeRoutsPanel
                categories={categories}
                onFilterChange={handleFilterChange}
                currentFilters={filterParams}
            />

            {/* Отображение маршрутов */}
            <UserLikeRoutsFiltered routes={filteredRoutes} />
        </div>
    );
};

export default UserLikeRouts;
