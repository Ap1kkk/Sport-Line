import React, { useState } from 'react';
import './Preferences.css';
import { useNavigate } from "react-router-dom";

const Preferences = () => {
    const [preferences, setPreferences] = useState([]);
    const navigate = useNavigate();

    const options = [
        { id: 1, label: "Бег" },
        { id: 2, label: "Туризм" },
        { id: 3, label: "С собачкой" },
        { id: 4, label: "Без собачки" },
        { id: 5, label: "На велосипеде" },
        { id: 6, label: "Прогулка" },
        { id: 7, label: "На выносливость" },
    ];

    const handlePreferenceToggle = (option) => {
        setPreferences((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option) // Удаляем, если уже выбран
                : [...prev, option] // Добавляем, если еще не выбран
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/users");
            if (!response.ok) throw new Error("Ошибка при запросе данных пользователей");

            const users = await response.json();

            const lastUser = users[users.length - 1];
            if (!lastUser) throw new Error("Пользователь не найден");

            const updateResponce = await fetch(`http://localhost:5000/users/${lastUser.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences }),
            });

            if (!updateResponce.ok) {
                throw new Error("Ошибка обновления предпочтений");
            } else {
                navigate('/main_page');
            }

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="_container">
            <h1>Предпочтения:</h1>
            <div className="preferences-buttons">
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.id}
                        className={`preference-button ${
                            preferences.includes(option.label) ? "active" : ""
                        }`}
                        onClick={() => handlePreferenceToggle(option.label)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <button type="submit" className="submit-button" onClick={handleSubmit}>
                Продолжить
            </button>
        </div>

    );
};

export default Preferences;
