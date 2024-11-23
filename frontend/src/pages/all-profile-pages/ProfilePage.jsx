import React, { useEffect, useState } from "react";
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
            <h1>Профиль</h1>
            <div className="profile-info">

                <div className="circle small-circle">
                    <p className="circle-text">{profile.km} k</p>
                    <p className="circle-label">пройдено шагов</p>
                </div>
                <div className="circle large-circle"></div>
                <div className="circle small-circle">
                    <p className="circle-text">{profile.achievements}</p>
                    <p className="circle-label">достижений<br/>получено</p>
                </div>
            </div>
            <h2>{profile.username}</h2>
            <p className="email">{profile.email}</p>
            <div className="menu">
                <button className="menu-button">статистика</button>
                <button className="menu-button">достижения</button>
                <button className="menu-button">история</button>
            </div>
        </div>
    );
};

export default ProfilePage;
