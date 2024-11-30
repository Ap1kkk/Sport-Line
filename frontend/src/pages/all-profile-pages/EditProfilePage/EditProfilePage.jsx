import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";
import {BASE_API_URL} from "../../../constants/globals";

const USER_PROFILE_URL = `${BASE_API_URL}/user/profile`;
const UPDATE_PROFILE_URL = `${BASE_API_URL}/user/edit`;
const AVATAR_PATH = "/static/avatars";

const EditProfilePage = () => {
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);
    const [preferences, setPreferences] = useState([]);
    const [availablePreferences, setAvailablePreferences] = useState([]);
    const [avatars, setAvatars] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                setMessage("Пользователь не авторизован");
                return;
            }

            try {
                // Fetch profile data
                const response = await fetch(USER_PROFILE_URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setCurrentAvatar(data.user.avatar.path);
                setPreferences(data.user.preferences.map(pref => pref.id));

                // Fetch available avatars
                setAvatars([
                    "/avatar1.png",
                    "/avatar2.png",
                    "/avatar3.png",
                    "/avatar4.png",
                    "/avatar5.png",
                    "/avatar6.png",
                    "/avatar7.png",
                    "/avatar8.png",
                ]);

                // Fetch available preferences
                const preferencesResponse = await fetch(
                    `${BASE_API_URL}/category/all`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                const preferencesData = await preferencesResponse.json();
                setAvailablePreferences(preferencesData);
            } catch (error) {
                console.error("Ошибка загрузки данных профиля:", error);
                setMessage("Не удалось загрузить данные профиля.");
            }
        };

        fetchProfileData();
    }, []);

    const handleAvatarSelect = (avatar) => {
        setNewAvatar(avatar);
    };

    const handlePreferenceToggle = (id) => {
        setPreferences((prev) =>
            prev.includes(id) ? prev.filter((prefId) => prefId !== id) : [...prev, id]
        );
    };

    const handleSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                setMessage("Пользователь не авторизован");
                return;
            }

            const response = await fetch(UPDATE_PROFILE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    avatarId: avatars.indexOf(newAvatar)+1,
                    preferencesIds: preferences,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка обновления профиля");
            }

            setMessage("Профиль успешно обновлён!");
            navigate("/ProfilePage");
        } catch (error) {
            console.error("Ошибка обновления профиля:", error);
            setMessage(error.message || "Не удалось обновить профиль.");
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Редактировать профиль</h1>
            {message && <p className="message">{message}</p>}

            <div className="avatar-section">
                <h2>Аватарка</h2>
                <div className="avatar-preview">
                    <div>
                        <p>Старая:</p>
                        {currentAvatar && (
                            <img
                                src={"/static" + currentAvatar}
                                alt="Current Avatar"
                                className="avatar-img"
                            />
                        )}
                    </div>
                    <div>
                        <p>Новая:</p>
                        {newAvatar && (
                            <img
                                src={AVATAR_PATH + newAvatar}
                                alt="New Avatar"
                                className="avatar-img"
                            />
                        )}
                    </div>
                </div>

                <div className="avatar-list">
                    {avatars.map((avatar, index) => (
                        <img
                            key={index}
                            src={AVATAR_PATH + avatar}
                            alt={`Avatar ${index}`}
                            className={`avatar-option ${
                                newAvatar === avatar ? "selected" : ""
                            }`}
                            onClick={() => handleAvatarSelect(avatar)}
                        />
                    ))}
                </div>
            </div>

            <div className="preferences-section">
                <h2>Предпочтения</h2>
                <div className="preferences-list">
                    {availablePreferences.map((option) => (
                        <button
                            key={option.id}
                            className={`preference-button ${
                                preferences.includes(option.id) ? "active" : ""
                            }`}
                            onClick={() => handlePreferenceToggle(option.id)}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            </div>

            <button className="save-button" onClick={handleSubmit}>
                Сохранить изменения
            </button>
            <div className="bottom-spacer"></div>
        </div>
    );
};

export default EditProfilePage;
