import React, { useState } from "react";
import FilterPopularRoutes from "./FilterPopularRoutes/FilterPopularRoutes";
import PopularFilteredRoutes from "./PopularFilteredRoutes/PopularFilteredRoutes";
import "./PopularRouts.css";

const PopularRoutes = () => {
    const [filters, setFilters] = useState({
        order: "ASC",
        difficulties: [],
        categoryIds: [],
        durationFrom: 0,
        durationTo: 0,
        distanceFrom: 0,
        distanceTo: 0,
    });

    const handleApplyFilters = (newFilters) => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("Объект пользователя из LocalStorage:", user);

        setFilters(newFilters);
    };

    return (
        <div className="popular-routes-container">
            <h1 className="routes-title">Популярные маршруты</h1>
            <FilterPopularRoutes filters={filters} onApply={handleApplyFilters} />
            <PopularFilteredRoutes filters={filters} />
        </div>
    );
};

export default PopularRoutes;
