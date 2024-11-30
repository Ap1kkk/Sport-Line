import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import "./UserLikeRoutsPanel.css";

const UserLikeRoutsPanel = ({ categories, onFilterChange, currentFilters }) => {
    const [filters, setFilters] = useState({
        ...currentFilters,
        durationFrom: 0,
        durationTo: 300,
        distanceFrom: 0,
        distanceTo: 100,
    });

    useEffect(() => {
        // Устанавливаем начальные значения ползунков
        setFilters((prev) => ({
            ...prev,
            durationFrom: 0,
            durationTo: 300,
            distanceFrom: 0,
            distanceTo: 100,
        }));
    }, []);

    const handleCheckboxChange = (categoryId) => {
        setFilters((prev) => ({
            ...prev,
            categoryIds: prev.categoryIds.includes(categoryId)
                ? prev.categoryIds.filter((id) => id !== categoryId)
                : [...prev.categoryIds, categoryId],
        }));
    };

    const handleDifficultiesChange = (difficulty) => {
        setFilters((prev) => ({
            ...prev,
            difficulties: prev.difficulties.includes(difficulty)
                ? prev.difficulties.filter((d) => d !== difficulty)
                : [...prev.difficulties, difficulty],
        }));
    };

    const handleSliderChange = (name, values) => {
        setFilters((prev) => ({
            ...prev,
            [name + "From"]: values[0],
            [name + "To"]: values[1],
        }));
    };

    const applyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <div className="filter-panel">
            <h2>Фильтры</h2>
            <div className="filter-section">
                <label>Порядок:</label>
                <select
                    name="order"
                    value={filters.order}
                    onChange={(e) =>
                        setFilters((prev) => ({...prev, order: e.target.value}))
                    }
                >
                    <option value="ASC">По возрастанию</option>
                    <option value="DESC">По убыванию</option>
                </select>
            </div>

            <div className="filter-section">
                <label>Сложность:</label>
                <div className="difficulty-buttons">
                    {["EASY", "MEDIUM", "HARD"].map((difficulty) => (
                        <button
                            key={difficulty}
                            className={`difficulty-button ${
                                filters.difficulties.includes(difficulty) ? "selected" : ""
                            }`}
                            onClick={() => handleDifficultiesChange(difficulty)}
                        >
                            {difficulty}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <label>Продолжительность (мин):</label>
                <ReactSlider
                    className="slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    min={0}
                    max={300}
                    step={10}
                    value={[filters.durationFrom, filters.durationTo]}
                    onChange={(values) => handleSliderChange("duration", values)}
                    renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                    )}
                />
            </div>

            <div className="filter-section">
                <label>Расстояние (км):</label>
                <ReactSlider
                    className="slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.distanceFrom, filters.distanceTo]}
                    onChange={(values) => handleSliderChange("distance", values)}
                    renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                    )}
                />
            </div>

            <div className="filter-section">
                <label>Категории:</label>
                <div className="category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-button ${
                                filters.categoryIds.includes(category.id) ? "selected" : ""
                            }`}
                            onClick={() => handleCheckboxChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={applyFilters} className="apply-button">
                Применить
            </button>
        </div>
    );
};

export default UserLikeRoutsPanel;
