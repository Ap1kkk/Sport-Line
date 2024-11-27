import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./HistoryFilterPanel.css";

const HistoryFilterPanel = ({ isOpen, filters, onApply, onReset, onClose }) => {
    const [tempFilters, setTempFilters] = useState(filters);

    const categoryOptions = [
        "Путешествия",
        "Кулинария",
        "Спорт",
        "Искусство",
        "Музыка",
        "Технологии",
    ];

    if (!isOpen) return null;

    const handleCategoryChange = (category) => {
        const newCategories = tempFilters.categories.includes(category)
            ? tempFilters.categories.filter((item) => item !== category)
            : [...tempFilters.categories, category];
        setTempFilters({ ...tempFilters, categories: newCategories });
    };

    const handleDateRangeChange = (value) => {
        setTempFilters({ ...tempFilters, dateRange: value });
    };

    return (
        <div className="history-filter-panel">
            <div className="filter-header">
                <h2>Фильтры истории</h2>
                <span onClick={onClose}>X</span>
            </div>

            <div className="filter-actions">
                <button onClick={() => onApply(tempFilters)}>Применить</button>
                <button onClick={onReset}>Сброс</button>
            </div>

            <div className="filter-section">
                <h2>Категории:</h2>
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

            <div className="filter-section">
                <h2>По дате:</h2>
                <ReactSlider
                    className="slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    value={tempFilters.dateRange}
                    onChange={handleDateRangeChange}
                    min={0}
                    max={30} // последние 30 дней
                    pearling
                    minDistance={1}
                />
                <div className="slider-labels">
                    <span>от {tempFilters.dateRange[0]} дней назад</span>
                    <span>до {tempFilters.dateRange[1]} дней назад</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryFilterPanel;
