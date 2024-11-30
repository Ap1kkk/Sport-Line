import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon32SearchOutline, Icon56ClockCircleDashedOutline } from "@vkontakte/icons";
import { Card, CardScroll, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { BASE_API_URL } from "../../constants/globals";
import './MainPage.css'; // Подключаем файл стилей

const MainPage = () => {
    const navigate = useNavigate();
    const [routeData, setRouteData] = useState(null);

    const handleButtonClickRouteOfTheDay = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error("Authorization token is missing.");
            }
            const response = await fetch(`${BASE_API_URL}/route/daily`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRouteData(data);
                const routeId = data.id;

                navigate(`/map/${routeId}`);
            } else {
                throw new Error("Route not found or API error.");
            }
        } catch (error) {
            console.error("Error fetching route data:", error);
        }
    };

    const handleButtonClickSearch = () => {
        navigate("/");
    };

    const handleButtonClickHistory = () => {
        navigate("/history");
    };

    return (
        <div className="container">
            <header className="header">
                <Icon56ClockCircleDashedOutline
                    onClick={handleButtonClickHistory}
                    width={32}
                    height={32}
                    color="#2975CC"
                    className="iconfromvk"
                />
                <h1 className="title">SportLine</h1>
                <Icon32SearchOutline
                    onClick={handleButtonClickSearch}
                    width={32}
                    height={32}
                    color="#2975CC"
                    className="iconfromvk"
                />
            </header>
            <main className="content">
                <div className="mapSection">
                    <div className="mapOverlay">
                        <h2 className="mapTitle">Маршрут дня</h2>
                        <button className="mapButton" onClick={handleButtonClickRouteOfTheDay}>
                            Поехали
                        </button>
                    </div>
                </div>

                <div className="recommendedSection">
                    <h3 className="sectionTitle">Рекомендуемые</h3>
                    <Group>
                        <CardScroll>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Card key={index} size="l" className="recommendedCard">
                                    <div>
                                        <img
                                            src={`https://via.placeholder.com/150?text=Route+${index + 1}`}
                                            alt={`Route ${index + 1}`}
                                            className="cardImage"
                                        />
                                        <p className="cardText">Название маршрута</p>
                                    </div>
                                </Card>
                            ))}
                        </CardScroll>
                    </Group>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
