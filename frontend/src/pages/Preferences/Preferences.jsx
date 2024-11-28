import React, { useState, useEffect } from 'react';
import './Preferences.css';
import { useNavigate } from "react-router-dom";

const Preferences = () => {
    const [options, setOptions] = useState([]); // Доступные категории из БД
    const [preferences, setPreferences] = useState([]); // Выбранные предпочтения
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.token) {
                    throw new Error("Пользователь не авторизован");
                }

                const response = await fetch("http://localhost:8080/api/v1/category/all", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error("Доступ запрещен. Проверьте токен.");
                    }
                    throw new Error("Ошибка загрузки категорий");
                }

                const categories = await response.json();
                console.log("Категории, полученные с сервера:", categories); // Лог для проверки формата
                setOptions(categories);
            } catch (error) {
                console.error("Ошибка при получении категорий:", error);
                setMessage(error.message || "Не удалось загрузить категории.");
            }
        };

        fetchCategories();
    }, []);


    const handlePreferenceToggle = (optionId) => {
        setPreferences((prev) =>
            prev.includes(optionId)
                ? prev.filter((id) => id !== optionId) // Убираем из выбранных, если уже есть
                : [...prev, optionId] // Добавляем, если еще не выбран
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.token) {
                setMessage("Пользователь не авторизован");
                return;
            }

            console.log("Отправляемые предпочтения:", preferences);
            console.log("Токен:", user.token);

            const response = await fetch("http://localhost:8080/api/v1/user/choose-preferences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify(preferences),
            });

            const result = await response.json();
            console.log("Ответ сервера:", result);

            if (!response.ok) {
                throw new Error(result.message || "Ошибка при сохранении предпочтений");
            }

            // Обновляем данные пользователя в localStorage
            const updatedUser = {
                ...user, // Сохраняем остальные данные пользователя
                preferences, // Добавляем или обновляем поле preferences
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setMessage("Предпочтения успешно сохранены!");
            navigate('/main_page');
        } catch (error) {
            console.error("Ошибка сохранения предпочтений:", error);
            setMessage(error.message || "Произошла ошибка.");
        }
    };


    return (
        <div className="_container">
            <h1>Предпочтения:</h1>
            {message && <p>{message}</p>}
            <div className="_preferences-buttons">
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.id}
                        className={`_preference-button ${preferences.includes(option.id) ? "active" : ""}`}
                        onClick={() => handlePreferenceToggle(option.id)}
                    >
                        {option.label || option.name || option.title} {/* Попробуйте разные поля */}
                    </button>
                ))}
            </div>
            <button type="submit" className="_submit-button" onClick={handleSubmit}>
                Продолжить
            </button>
        </div>
    );
};

export default Preferences;
