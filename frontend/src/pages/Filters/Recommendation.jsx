import React, { useState } from "react";
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

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="recommendation-container">
            <h1 className="routes-title">Рекомендованные маршруты</h1>
            <RecommendationFilterPanel filters={filters} onApply={handleApplyFilters} />
            <RecommendationFilteredRoutes filters={filters} />
        </div>
    );
};

export default Recommendation;
