import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AchievementsPage.css";
import {BASE_API_URL} from "../../../constants/globals";

const USER_ACHIEVEMENTS_URL = `${BASE_API_URL}/user/achievements`;

const AchievementsPage = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {

        const fetchAchievements = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            try {
                const response = await fetch(USER_ACHIEVEMENTS_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                const mappedAchievements = data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    progress: item.progress,
                    goal: item.goal,
                    progressPercent: Math.round((item.progress / item.goal) * 100),
                }));
                setAchievements(mappedAchievements);
            } catch (error) {
                console.error("Ошибка загрузки достижений:", error);
            }
        };
        fetchAchievements();
    }, []);

    return (
        <div className="achievements-container">
            <div className="header">
                <h1>Достижения</h1>
            </div>
            <div className="achievements-grid">
                {achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-card">
                        <div className="circle large-circle">
                            <img
                                src={`/AchievementsPicture/achievements${achievement.id}.png`}
                                alt={achievement.name}
                                className="achievement-img"
                            />
                        </div>
                        <h3 className="achievement-title">{achievement.name}</h3>
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
        </div>
    );
};

export default AchievementsPage;
