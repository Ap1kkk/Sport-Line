import React, { useState } from 'react';
import './Filters.css';

const Filters = () => {
    const [timeMin, setTimeMin] = useState(20);
    const [timeMax, setTimeMax] = useState(45);
    const [lengthMin, setLengthMin] = useState(20);
    const [lengthMax, setLengthMax] = useState(45);
    const [difficulty, setDifficulty] = useState(['легкий']);

    const handleTimeMinChange = (e) => {
        setTimeMin(e.target.value);
    };

    const handleTimeMaxChange = (e) => {
        setTimeMax(e.target.value);
    };

    const handleLengthMinChange = (e) => {
        setLengthMin(e.target.value);
    };

    const handleLengthMaxChange = (e) => {
        setLengthMax(e.target.value);
    };

    const handleDifficultyChange = (level) => {
        if (difficulty.includes(level)) {
            setDifficulty(difficulty.filter((item) => item !== level));
        } else {
            setDifficulty([...difficulty, level]);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Рекомендуемые</h1>
            <div className="filters">
                <div className="filters-header">
                    <span>Фильтры</span>
                    <span className="arrow">∨</span>
                </div>

                {/* По сложности */}
                <div className="filter-section">
                    <h2>По сложности</h2>
                    <div className="buttons">
                        {['легкий', 'средний', 'сложный'].map((level) => (
                            <button
                                key={level}
                                className={difficulty.includes(level) ? 'selected' : ''}
                                onClick={() => handleDifficultyChange(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* По времени */}
                <div className="filter-section">
                    <h2>По времени</h2>
                    <div className="slider">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={timeMin}
                            onChange={handleTimeMinChange}
                            className="slider-input"
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={timeMax}
                            onChange={handleTimeMaxChange}
                            className="slider-input"
                        />
                    </div>
                    <div className="slider-labels">
                        <span>от {timeMin}</span>
                        <span>до {timeMax}</span>
                    </div>
                </div>

                {/* По длине */}
                <div className="filter-section">
                    <h2>По длине</h2>
                    <div className="slider">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={lengthMin}
                            onChange={handleLengthMinChange}
                            className="slider-input"
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={lengthMax}
                            onChange={handleLengthMaxChange}
                            className="slider-input"
                        />
                    </div>
                    <div className="slider-labels">
                        <span>от {lengthMin}</span>
                        <span>до {lengthMax}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
