import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./FilterPanel.css";

const FilterPanel = ({ isOpen, filters, onApply, onReset, onClose }) => {
    const [tempFilters, setTempFilters] = useState(filters);

    const categoryOptions = [
        "Путешествия",
        "Спорт",
        "Кулинария",
        "Технологии",
        "Искусство",
        "Музыка",
    ];

    if (!isOpen) return null;

    const handleDifficultyChange = (level) => {
        const newDifficulty = tempFilters.difficulty.includes(level)
            ? tempFilters.difficulty.filter((item) => item !== level)
            : [...tempFilters.difficulty, level];
        setTempFilters({ ...tempFilters, difficulty: newDifficulty });
    };

    const handleCategoryChange = (category) => {
        const newCategories = tempFilters.categories.includes(category)
            ? tempFilters.categories.filter((item) => item !== category)
            : [...tempFilters.categories, category];
        setTempFilters({ ...tempFilters, categories: newCategories });
    };

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <h2>Фильтры</h2>
                <span onClick={onClose}>V</span>
            </div>
            {/* Кнопки применения/сброса */}
            <div className="filter-actions">
                <button onClick={() => onApply(tempFilters)}>Применить</button>
                <button onClick={onReset}>Сброс</button>
            </div>
            {/* Фильтр по сложности */}
            <div className="filter-section">
                <h2>По сложности:</h2>
                <div className="buttons">
                    {["легкий", "средний", "сложный"].map((level) => (
                        <button
                            key={level}
                            className={tempFilters.difficulty.includes(level) ? "selected" : ""}
                            onClick={() => handleDifficultyChange(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ползунок по времени */}
            <div className="filter-section">
                <h2>По времени:</h2>
                <ReactSlider
                    className="slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    value={tempFilters.timeRange}
                    onChange={(value) => setTempFilters({ ...tempFilters, timeRange: value })}
                    min={0}
                    max={100}
                    pearling
                    minDistance={5}
                />
                <div className="slider-labels">
                    <span>от {tempFilters.timeRange[0]}</span>
                    <span>до {tempFilters.timeRange[1]}</span>
                </div>
            </div>

            {/* Ползунок по длине */}
            <div className="filter-section">
                <h2>По длине:</h2>
                <ReactSlider
                    className="slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    value={tempFilters.lengthRange}
                    onChange={(value) => setTempFilters({ ...tempFilters, lengthRange: value })}
                    min={0}
                    max={100}
                    pearling
                    minDistance={5}
                />
                <div className="slider-labels">
                    <span>от {tempFilters.lengthRange[0]}</span>
                    <span>до {tempFilters.lengthRange[1]}</span>
                </div>
            </div>

            {/* Фильтр по категориям */}
            <div className="filter-section">
                <h2>По категориям:</h2>
                <div className="buttons">
                    {categoryOptions.map((category) => (
                        <button
                            key={category}
                            className={tempFilters.categories.includes(category) ? "selected" : ""}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
