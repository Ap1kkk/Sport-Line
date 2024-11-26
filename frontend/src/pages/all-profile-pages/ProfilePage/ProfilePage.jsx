import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch("http://localhost:5000/users/5d0e");
            const data = await response.json();
            setProfile(data);
        };

        fetchProfileData();
    }, []);

    return (
        <div className="profile-container">
            <div className="header">
                <h1>Профиль</h1>
                <Link to="/EditProfilePage" className="edit-button">Ред</Link>
            </div>
            <div className="profile-info">

                <div className="circle small-circle">
                    <p className="circle-text">{profile.km} k</p>
                    <p className="circle-label">пройдено шагов</p>
                </div>
                <div className="circle large-circle">
                    <img
                        src={profile.avatar || "/avatars/avatar1.png"}
                        alt="Аватар"
                        className="avatar-img"
                    />
                </div>
                <div className="circle small-circle">
                    <p className="circle-text">{profile.achievements}</p>
                    <p className="circle-label">достижений<br/>получено</p>
                </div>
            </div>
            <h2>{profile.username}</h2>
            <p className="email">{profile.email}</p>
            <div className="menu">
                <Link to="/StatisticsPage" className="menu-button">статистика</Link>
                <Link to="/AchievementsPage" className="menu-button">достижения</Link>
                <Link to="/RouteHistoryPage" className="menu-button">история</Link>
            </div>
        </div>
    );
};

export default ProfilePage;
