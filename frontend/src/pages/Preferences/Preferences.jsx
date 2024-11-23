import React, {useState} from 'react';
import './Preferences.css';
import {useNavigate} from "react-router-dom";

const Preferences = () => {
    const [preferences, setPreferences] = useState([])

    const options = [
        { id: 1, label: "Бег" },
        { id: 2, label: "Туризм" },
        { id: 3, label: "С собачкой" },
        { id: 4, label: "Без собачки" },
        { id: 5, label: "Секс" },
        { id: 6, label: "Разврат" },
        { id: 7, label: "Похоть" },
    ];

    const navigate = useNavigate()

    const handleCheckboxChange = (option) => {
        setPreferences((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option) // Удаляем, если уже выбран
                : [...prev, option] // Добавляем, если еще не выбран
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch ("http://localhost:5000/users")
            if (!response.ok) throw new Error("Ошибка при запросе данных пользователей")

            const users = await response.json()

            const lastUser = users[users.length - 1]
            if (!lastUser) throw new Error("Пользователь не найден")

            const updateResponce = await fetch(`http://localhost:5000/users/${lastUser.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({preferences}),
            });

            if (!updateResponce.ok) {
                throw new Error("Ошибка обновления предпочтений")
            } else {
                navigate('/main_page')
            }

        } catch (error) {
            console.error("Ошибка:", error)
        }
    }

    return (
        <div className='container'>
            <h1>Выберите ваши предпочтения:</h1>
            <form onSubmit={handleSubmit}>
                <div className={'preferences-list'}>
                    {options.map((option) => (
                        <label key={option.id}>
                            <input
                                type='checkbox'
                                value={option.label}
                                onChange={() => handleCheckboxChange(option.label)}
                                checked={preferences.includes(option.label)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
                <button type='submit' className='button'>Сохранить предпочтения</button>
            </form>
        </div>
    );
};

export default Preferences;