import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon32SearchOutline, Icon56ClockCircleDashedOutline } from "@vkontakte/icons";
import { Card, CardScroll, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
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
            const response = await fetch("/api/v1/route/daily", {
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
        navigate("/main_page/search_page");
    };

    const handleButtonClickHistory = () => {
        navigate("/main_page/history");
    };

    const handleButtonClickRecommendation = () => {
        navigate("/main_page/recomendation");
    }

    const handleButtonClickPopular = () => {
        navigate("/main_page/popular");
    }

    return (
        <div className="container">
            
            {/* Header */}
            <header className="header">
                <Icon56ClockCircleDashedOutline
                    onClick={handleButtonClickHistory}
                    width={32}
                    height={32}
                    color="#2975CC"
                />
                <h1 className="title">SportLine</h1>
                <Icon32SearchOutline onClick={handleButtonClickSearch} width={32} height={32} color="#2975CC" />
            </header>
            <div class="map-NiNo">
                {/* Map Section */}
                <div className="mapSection">
                    <div className="mapOverlay">
                        <h2 className="mapTitle">Маршрут дня</h2>
                        <button className="mapButton" onClick={handleButtonClickRouteOfTheDay}>
                            Поехали
                        </button>
                    </div>
                </div>
                </div>
                
                {/* Recommended Routes */}
                <div className="recommendedSection">
                    <div className="main_title">
                        <h3 className="sectionTitle">Рекомендуемые</h3>
                        <img onClick={handleButtonClickRecommendation} className="arrow" src="/icons/стрелка.svg" alt="стрелка" />
                    </div>
                    <div style={{ marginLeft: "-40px" }}>
                        <Group>
                            <CardScroll>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Card key={index} size="l" className="recommendedCard">
                                        <div class="cardRec">
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
                </div>
            
            {/* Popular Section */}
            <div className="popularSection">
                <div className="main_title">
                        <h3 className="sectionTitle">Популярные</h3>
                        <img onClick={handleButtonClickPopular} className="arrow" src="/icons/стрелка.svg" alt="стрелка" />
                    </div>
                
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="popularCard">
                        <img
                            src={`https://via.placeholder.com/150?text=Popular+Route+${index + 1}`}
                            alt={`Popular Route ${index + 1}`}
                            className="popularImage"
                        />
                        <div className="popularContent">
                            <p className="popularTitle">Название маршрута</p>
                            <p className="popularInfo">Расстояние - 5 480</p>
                            <p className="popularInfo">Сложность - Средняя</p>
                            <div className="tagContainer">
                                <span className="tag">Бег</span>
                                <span className="tag">Туризм</span>
                                <span className="tag">С питомцем</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
