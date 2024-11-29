import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import "./SearchRoutsPanel.css";

const SearchRoutsPanel = ({ filters, onApply }) => {
    const [tempFilters, setTempFilters] = useState(filters);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    throw new Error("Отсутствует токен авторизации");
                }

                const response = await fetch("http://localhost:8080/api/v1/category/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка загрузки категорий: ${response.status}`);
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Ошибка загрузки категорий:", error);
                setError("Не удалось загрузить категории");
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDifficultyChange = (level) => {
        const newDifficulties = tempFilters.difficulties.includes(level)
            ? tempFilters.difficulties.filter((item) => item !== level)
            : [...tempFilters.difficulties, level];
        setTempFilters({ ...tempFilters, difficulties: newDifficulties });
    };

    const handleCategoryChange = (categoryId) => {
        const newCategoryIds = tempFilters.categoryIds.includes(categoryId)
            ? tempFilters.categoryIds.filter((item) => item !== categoryId)
            : [...tempFilters.categoryIds, categoryId];
        setTempFilters({ ...tempFilters, categoryIds: newCategoryIds });
    };

    const applyFilters = () => {
        onApply(tempFilters);
    };

    return (
        <div className="filter-panel">
            <h2>Фильтры</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="filter-section">
                <h3>Сложность</h3>
                <div className="buttons">
                    {["EASY", "MEDIUM", "HARD"].map((level) => (
                        <button
                            key={level}
                            className={tempFilters.difficulties.includes(level) ? "selected" : ""}
                            onClick={() => handleDifficultyChange(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3>Категории</h3>
                {loadingCategories ? (
                    <p>Загрузка категорий...</p>
                ) : (
                    <div className="buttons">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={tempFilters.categoryIds.includes(category.id) ? "selected" : ""}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="filter-section">
                <h3>Время прохождения</h3>
                <ReactSlider
                    className="slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    value={[tempFilters.durationFrom, tempFilters.durationTo]}
                    onChange={(value) =>
                        setTempFilters({ ...tempFilters, durationFrom: value[0], durationTo: value[1] })
                    }
                    min={0}
                    max={2000}
                />
                <div className="slider-labels">
                    <span>от {tempFilters.durationFrom} ч</span>
                    <span>до {tempFilters.durationTo} ч</span>
                </div>
            </div>

            <div className="filter-section">
                <h3>Дистанция</h3>
                <ReactSlider
                    className="slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    value={[tempFilters.distanceFrom, tempFilters.distanceTo]}
                    onChange={(value) =>
                        setTempFilters({ ...tempFilters, distanceFrom: value[0], distanceTo: value[1] })
                    }
                    min={0}
                    max={4000}
                />
                <div className="slider-labels">
                    <span>от {tempFilters.distanceFrom} м</span>
                    <span>до {tempFilters.distanceTo} м</span>
                </div>
            </div>

            <button onClick={applyFilters} className="apply-button">
                Применить
            </button>
        </div>
    );
};

export default SearchRoutsPanel;
