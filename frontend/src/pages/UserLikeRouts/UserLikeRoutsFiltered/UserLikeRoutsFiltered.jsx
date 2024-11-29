import React from "react";
import "./UserLikeRoutsFiltered.css";

const UserLikeRoutsFiltered = ({ routes }) => {
    if (!routes.length) {
        return <p>Нет избранных маршрутов для отображения.</p>;
    }

    return (
        <div className="routes-list">
            {routes.map((route) => (
                <div key={route.id} className="route-card">
                    <h3>{route.name}</h3>
                    <p>Сложность: {route.difficulty}</p>
                    <p>Категория: {route.categoryName}</p>
                    <p>Дистанция: {route.distance} метр</p>
                    <p>Продолжительность: {route.duration} мин</p>
                </div>
            ))}
        </div>
    );
};

export default UserLikeRoutsFiltered;
