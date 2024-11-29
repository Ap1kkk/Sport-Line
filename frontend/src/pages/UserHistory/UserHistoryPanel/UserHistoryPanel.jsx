import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./UserHistoryPanel.css";

const UserHistoryPanel = ({ categories, onFilterChange, currentFilters }) => {
    const [filters, setFilters] = useState(currentFilters);

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
                        setFilters((prev) => ({ ...prev, order: e.target.value }))
                    }
                >
                    <option value="ASC">По возрастанию</option>
                    <option value="DESC">По убыванию</option>
                </select>
            </div>

            <div className="filter-section">
                <label>Сложность:</label>
                {["EASY", "MEDIUM", "HARD"].map((difficulty) => (
                    <label key={difficulty}>
                        <input
                            type="checkbox"
                            checked={filters.difficulties.includes(difficulty)}
                            onChange={() => handleDifficultiesChange(difficulty)}
                        />
                        {difficulty}
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <label>Категории:</label>
                {categories.map((category) => (
                    <label key={category.id}>
                        <input
                            type="checkbox"
                            checked={filters.categoryIds.includes(category.id)}
                            onChange={() => handleCheckboxChange(category.id)}
                        />
                        {category.name}
                    </label>
                ))}
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
                    renderThumb={(props, state) => {
                        const { key, ...restProps } = props; // Извлекаем key из props
                        return (
                            <div key={key} {...restProps}>
                                {state.valueNow}
                            </div>
                        );
                    }}
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
                    renderThumb={(props, state) => {
                        const { key, ...restProps } = props; // Извлекаем key из props
                        return (
                            <div key={key} {...restProps}>
                                {state.valueNow}
                            </div>
                        );
                    }}
                />
            </div>

            <button onClick={applyFilters} className="apply-button">
                Применить
            </button>
        </div>
    );
};

export default UserHistoryPanel;
