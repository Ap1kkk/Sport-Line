import React from "react";
import "./FilteredRoutes.css";

const FilteredRoutes = ({ routes }) => {
    return (
        <div className="routes-container">
            {routes.length > 0 ? (
                <ul className="routes-list">
                    {routes.map((route) => (
                        <li key={route.id} className="route-card">
                            <div className="route-card-left">
                                <button className="favorite-button">♡</button>
                            </div>
                            <div className="route-card-right">
                                <h2 className="route-name">{route.name}</h2>
                                <p className="route-details">
                                    <span>{route.length} м</span>
                                    <span>{route.difficulty}</span>
                                </p>
                                <div className="route-tags">
                                    <span>достопримечательности</span>
                                    <span>с собакой</span>
                                    <span>вертикальность</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет подходящих маршрутов.</p>
            )}
        </div>
    );
};

export default FilteredRoutes;
