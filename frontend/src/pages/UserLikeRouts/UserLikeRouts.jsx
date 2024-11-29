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
            const response = await fetch(
                "http://localhost:8080/api/v1/user/routes/favourite",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(filterParams),
                }
            );

            if (!response.ok) throw new Error("Ошибка фильтрации маршрутов");
            const data = await response.json();
            setFilteredRoutes(data);
        } catch (error) {
            console.error("Ошибка при загрузке маршрутов:", error);
        }
    };

    useEffect(() => {
        fetchFilteredRoutes();
    }, [filterParams]);

    return (
        <div className="user-like-routs-container">
            <h1>Избранные маршруты</h1>
            <UserLikeRoutsPanel
                categories={categories}
                onFilterChange={handleFilterChange}
                currentFilters={filterParams}
            />
            <UserLikeRoutsFiltered routes={filteredRoutes} />
        </div>
    );
};

export default UserLikeRouts;
