import React, { useState, useEffect } from "react";
import "./EditProfilePage.css";
import { useNavigate } from "react-router-dom";

const avatarOptions = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png"
];

const options = [
    { id: 1, label: "Бег" },
    { id: 2, label: "Туризм" },
    { id: 3, label: "С собачкой" },
    { id: 4, label: "Без собачки" },
    { id: 5, label: "На велосипеде" },
    { id: 6, label: "Прогулка" },
    { id: 7, label: "На выносливость" },
];

const EditProfilePage = () => {
    const [currentAvatar, setCurrentAvatar] = useState("/avatars/avatar1.png");
    const [newAvatar, setNewAvatar] = useState("/avatars/avatar1.png");
    const [user, setUser] = useState(null);
    const [preferences, setPreferences] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("http://localhost:5000/users/5d0e");
            const data = await response.json();
            setUser(data);
            setCurrentAvatar(data.avatar || "/avatars/avatar1.png");
            setNewAvatar(data.avatar || "/avatars/avatar1.png");
            setPreferences(data.preferences || []);
        };

        fetchUserData();
    }, []);

    const handleAvatarSelect = (avatar) => {
        setNewAvatar(avatar);
    };

    const handlePreferenceToggle = (option) => {
        setPreferences((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const handleSaveChanges = async () => {
        const updatedUser = { ...user, avatar: newAvatar, preferences };

        await fetch(`http://localhost:5000/users/5d0e`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        setCurrentAvatar(newAvatar);

        navigate("/ProfilePage");
    };

    return (
        <div className="edit-profile-container">
            <h1>Редактировать</h1>
            <div className="avatar-section">
                <div className="avatar-wrapper">
                    <div className="circle-edit">
                        <img src={newAvatar} alt="Новая аватарка" className="avatar-img" />
                    </div>
                    <p className="avatar-label">новая</p>
                </div>
                <div className="avatar-wrapper">
                    <div className="circle-edit">
                        <img src={currentAvatar} alt="Старая аватарка" className="avatar-img" />
                    </div>
                    <p className="avatar-label">старая</p>
                </div>
            </div>
            <h2>Выбрать аватарку</h2>
            <div className="avatar-grid">
                {avatarOptions.map((avatar, index) => (
                    <div
                        key={index}
                        className="circle-edit avatar-option"
                        onClick={() => handleAvatarSelect(avatar)}
                    >
                        <img src={avatar} alt={`Аватар ${index + 1}`} className="avatar-img" />
                    </div>
                ))}
            </div>

            <h2>Предпочтения</h2>
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

            <button onClick={handleSaveChanges} className="submit-button-edit">Сохранить изменения</button>
        </div>
    );
};

export default EditProfilePage;
