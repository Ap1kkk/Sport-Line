import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./ProfilePage.css";

const  USER_INFORMATION_URL = "http://localhost:8080/api/v1/user/profile";

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        user: {
            avatar: "default",
            username: "",
            email: "",
        },
        totalDistance: 0,
        totalAchievements: 0,
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(USER_INFORMATION_URL, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                },
            });
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
                    <p className="circle-text">{profile.totalDistance} k</p>
                    <p className="circle-label">пройдено шагов</p>
                </div>
                <div className="circle large-circle">
                    <img
                        src={"http://localhost:8080/static"+profile.user.avatar.path}
                        alt="Аватар"
                        className="avatar-img"
                    />
                </div>
                <div className="circle small-circle">
                    <p className="circle-text">{profile.totalAchievements}</p>
                    <p className="circle-label">достижений<br/>получено</p>
                </div>
            </div>
            <h2>{profile.user.username}</h2>
            <p className="email">{profile.user.email}</p>
            <div className="menu">
                <Link to="/StatisticsPage" className="menu-button">статистика</Link>
                <Link to="/AchievementsPage" className="menu-button">достижения</Link>
                <Link to="/RouteHistoryPage" className="menu-button">история</Link>
            </div>
        </div>
    );
};

export default ProfilePage;
