import React, { useState, useEffect } from "react";
import "./AchievementsPage.css";

const achievementsData = [
    {
        id: 1,
        image: "achievements1.png",
        title: "Новичок",
        description: "пройти 5 маршрутов",
        total: 5,
    },
    {
        id: 2,
        image: "achievements2.png",
        title: "Романтик",
        description: "посетить 5 маршрутов с видом на закат",
        total: 5,
    },
    {
        id: 3,
        image: "achievements3.png",
        title: "Спортсмен",
        description: "участвовать в 5 спортивных маршрутах",
        total: 5,
    },
    {
        id: 4,
        image: "achievements4.png",
        title: "Ночная прогулка",
        description: "пройти маршрут после полуночи",
        total: 1,
    },
    {
        id: 5,
        image: "achievements5.png",
        title: "Путешественник",
        description: "пройти маршруты в 5 разных городах",
        total: 5,
    },
    {
        id: 6,
        image: "achievements6.png",
        title: "Завсегдатай",
        description: "пройти один маршрут 10 раз",
        total: 10,
    },
];

const AchievementsPage = () => {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        // Загружаем данные пользователя
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/users/5d0e"); // Здесь замените ID на актуальный
                const data = await response.json();
                setUser(data);

                // Загружаем прогресс ачивок пользователя
                if (data.achievementsProgress) {
                    setProgress(data.achievementsProgress);
                }
            } catch (error) {
                console.error("Ошибка загрузки пользователя:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p>Загрузка...</p>;
    }

    // Объединяем статическую информацию с прогрессом пользователя
    const mergedData = achievementsData.map((achievement) => {
        const progressData = progress.find((p) => p.id === achievement.id) || {
            current: 0,
        };
        const progressPercent = Math.round(
            (progressData.current / achievement.total) * 100
        );
        return { ...achievement, current: progressData.current, progressPercent };
    });

    return (
        <div className="achievements-container">
            <h1 className="achievements-title">Достижения</h1>
            <div className="achievements-grid">
                {mergedData.map((achievement) => (
                    <div key={achievement.id} className="achievement-card">
                        <div className="achievement-icon">
                            <img
                                src={`/AchievementsPicture/${achievement.image}`}
                                alt={achievement.title}
                                className="achievement-img"
                            />
                        </div>
                        <h3 className="achievement-title">{achievement.title}</h3>
                        <p className="achievement-description">{achievement.description}</p>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${achievement.progressPercent}%` }}
                            ></div>
                            <span className="progress-text">
                                {achievement.progressPercent}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div class="bottom-spacer"></div>
        </div>
    );
};

export default AchievementsPage;
