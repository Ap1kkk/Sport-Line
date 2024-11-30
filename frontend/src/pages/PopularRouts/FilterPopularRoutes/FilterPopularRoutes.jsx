import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import "./FilterPopularRoutes.css";
import { BASE_API_URL } from "../../../constants/globals";

const FilterPopularRoutes = ({ filters, onApply }) => {
    const [tempFilters, setTempFilters] = useState({
        ...filters,
        durationFrom: 0,
        durationTo: 2000,
        distanceFrom: 0,
        distanceTo: 4000,
    });
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(null);
    const [isPanelClosed, setIsPanelClosed] = useState(true); // Закрыта по умолчанию

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    throw new Error("Отсутствует токен авторизации");
                }

                const response = await fetch(`${BASE_API_URL}/category/all`, {
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

    const handleResetFilters = () => {
        const defaultFilters = {
            order: "ASC",
            difficulties: [],
            categoryIds: [],
            durationFrom: 0,
            durationTo: 2000,
            distanceFrom: 0,
            distanceTo: 4000,
        };
        setTempFilters(defaultFilters);
        onApply(defaultFilters);
    };

    const handleApplyFilters = () => {
        onApply(tempFilters);
    };

    const togglePanel = () => {
        setIsPanelClosed(!isPanelClosed);
    };

    return (
        <div className="filter-panel-wrapper">
            <div className={`filter-panel-Popular ${isPanelClosed ? "closed" : ""}`}>
                <button className="popular-close-button" onClick={togglePanel}>
                    {isPanelClosed ? "▼" : "✕"}
                </button>
                {isPanelClosed ? (
                    <div className="closed-content">
                        <span>Фильтры</span>
                    </div>
                ) : (
                    <>
                        <h2>Фильтры</h2>
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <div className="filter-buttons">
                            <button onClick={handleApplyFilters}>Применить</button>
                            <button className="reset-button" onClick={handleResetFilters}>
                                Сбросить
                            </button>
                        </div>

                        <div className="filter-section">
                            <h3>Сложность</h3>
                            <div className="difficult_buttons">
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
                            <h3>Время прохождения</h3>
                            <ReactSlider
                                className="popular_slider"
                                thumbClassName="popular-slider-thumb"
                                trackClassName="popular-slider-track"
                                activeClassName="active-track"
                                value={[tempFilters.durationFrom, tempFilters.durationTo]}
                                onChange={(value) =>
                                    setTempFilters({
                                        ...tempFilters,
                                        durationFrom: value[0],
                                        durationTo: value[1],
                                    })
                                }
                                min={0}
                                max={2000}
                            />
                            <div className="input-row">
                                <input
                                    type="number"
                                    value={tempFilters.durationFrom}
                                    onChange={(e) =>
                                        setTempFilters({ ...tempFilters, durationFrom: +e.target.value })
                                    }
                                />
                                <input
                                    type="number"
                                    value={tempFilters.durationTo}
                                    onChange={(e) =>
                                        setTempFilters({ ...tempFilters, durationTo: +e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Дистанция</h3>
                            <ReactSlider
                                className="popular_slider"
                                thumbClassName="popular-slider-thumb"
                                trackClassName="popular-slider-track"
                                activeClassName="active-track"
                                value={[tempFilters.distanceFrom, tempFilters.distanceTo]}
                                onChange={(value) =>
                                    setTempFilters({
                                        ...tempFilters,
                                        distanceFrom: value[0],
                                        distanceTo: value[1],
                                    })
                                }
                                min={0}
                                max={4000}
                            />
                            <div className="input-row">
                                <input
                                    type="number"
                                    value={tempFilters.distanceFrom}
                                    onChange={(e) =>
                                        setTempFilters({ ...tempFilters, distanceFrom: +e.target.value })
                                    }
                                />
                                <input
                                    type="number"
                                    value={tempFilters.distanceTo}
                                    onChange={(e) =>
                                        setTempFilters({ ...tempFilters, distanceTo: +e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Категории</h3>
                            {loadingCategories ? (
                                <p>Загрузка категорий...</p>
                            ) : (
                                <div className="category_buttons">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={
                                                tempFilters.categoryIds.includes(category.id) ? "selected" : ""
                                            }
                                            onClick={() => handleCategoryChange(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FilterPopularRoutes;
