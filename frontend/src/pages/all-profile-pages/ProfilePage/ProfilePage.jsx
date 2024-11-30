import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./ProfilePage.css";
import {BASE_API_URL} from "../../../constants/globals";

const  USER_INFORMATION_URL = `${BASE_API_URL}/user/profile`;

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

    const exitProfile = () => {
        localStorage.clear();
    }

    return (
        <div className="profile-container">
            <div className="header_menu">
                <div></div>
                <h1>Профиль</h1>
                <div>
                    <Link to="/profile_page/edit_profile_page" className="edit-button">Ред</Link>
                </div>
            </div>
            <div className="profile-info">

                <div className="circle small-circle">
                    <p className="circle-text">{profile.totalDistance} k</p>
                    <p className="circle-label">пройдено шагов</p>
                </div>
                <div className="circle large-circle">
                    <img
                        src={"/static/image"+profile.user.avatar.path}
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
            <div className="block-email">
                <div></div>
                <p className="email">{profile.user.email}</p>
            </div>

            <div className="menu">
                <Link to="/profile_page/statistics_page" className="menu-button">статистика</Link>
                <Link to="/profile_page/achievements_page" className="menu-button">достижения</Link>
                <Link to="/profile_page/route_history_page" className="menu-button">история</Link>
            </div>
            <div></div>
            <Link onClick={exitProfile} to="/login" className="menu-button end-button">Выход</Link>
        </div>
    );
};

export default ProfilePage;
