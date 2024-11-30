import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon32SearchOutline, Icon56ClockCircleDashedOutline } from "@vkontakte/icons";
import { Card, CardScroll, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import './MainPage.css';
import { BASE_API_URL, BASE_STATIC_URL } from "../../constants/globals"; // Подключаем файл стилей

const LIMIT = 5;

const MainPage = () => {
    const navigate = useNavigate();
    const [routeData, setRouteData] = useState(null);
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [recommendedRoutes, setRecommendedRoutes] = useState([]);
    const [likedRoutes, setLikedRoutes] = useState({}); // Состояние для лайков

    // Перевод сложности
    const difficultyTranslation = {
        EASY: "Легкий",
        MEDIUM: "Средний",
        HARD: "Тяжелый",
    };

    // Загружаем данные маршрутов
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    throw new Error("Отсутствует токен авторизации");
                }

                const recommendedRoutesResponse = await fetch(`${BASE_API_URL}/route/recommended?limit=${LIMIT}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const popularRoutesResponse = await fetch(`${BASE_API_URL}/route/popular?limit=${LIMIT}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (recommendedRoutesResponse.ok) {
                    const data = await recommendedRoutesResponse.json();
                    setRecommendedRoutes(data);
                } else {
                    console.error("Error fetching routes");
                }

                if (popularRoutesResponse.ok) {
                    const data = await popularRoutesResponse.json();
                    setPopularRoutes(data);
                } else {
                    console.error("Error fetching routes");
                }
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };
        fetchData();
    }, []);

    // Обработчики переходов
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
        navigate("/main_page/search_page");
    };

    const handleButtonClickHistory = () => {
        navigate("/main_page/history");
    };

    const handleButtonClickRecommendation = () => {
        navigate("/main_page/recomendation");
    };

    const handleButtonClickPopular = () => {
        navigate("/main_page/popular");
    };

    // Функция для переключения лайков
    const toggleLike = (routeId) => {
        setLikedRoutes((prevLikedRoutes) => ({
            ...prevLikedRoutes,
            [routeId]: !prevLikedRoutes[routeId], // Переключаем состояние лайка для маршрута
        }));
    };

    const renderTags = (categories) => categories.map((cat) => <span key={cat.id} className="tag">{cat.name}</span>);

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

            <div className="map-NiNo">
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

            <div className="recommendedSection">
                <div className="main_title">
                    <h3 className="sectionTitle">Рекомендуемые</h3>
                    <img
                        onClick={handleButtonClickRecommendation}
                        className="arrow"
                        src="/icons/стрелка.svg"
                        alt="стрелка"
                    />
                </div>
                <div style={{ marginLeft: "-40px" }}>
                    <Group>
                        <CardScroll>
                            {recommendedRoutes.map((route) => (
                                <Card key={route.id} size="l" className="recommendedCard">
                                    <a href={`/map/${route.id}`}>
                                        <div className="cardRec">
                                            <img
                                                src={BASE_STATIC_URL + route.imagePath}
                                                alt={route.name}
                                                className="cardImage"
                                            />
                                            <p className="cardText">{route.name}</p>
                                            <div className="like-container">
                                                <img
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Чтобы предотвратить переход
                                                        toggleLike(route.id);
                                                    }}
                                                    src={likedRoutes[route.id] ? "/icons/liked.svg" : "/icons/like.svg"}
                                                    alt={likedRoutes[route.id] ? "Дизлайк" : "Лайк"}
                                                    className="like-icon"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                </Card>
                            ))}
                        </CardScroll>
                    </Group>
                </div>
            </div>

            <div className="popularSection">
                <div className="main_title">
                    <h3 className="sectionTitle">Популярные</h3>
                    <img
                        onClick={handleButtonClickPopular}
                        className="arrow"
                        src="/icons/стрелка.svg"
                        alt="стрелка"
                    />
                </div>

                {popularRoutes.map((route) => (
                    <div key={route.id} className="popularCard">
                        <a href={`/map/${route.id}`}>
                            <img
                                src={BASE_STATIC_URL + route.imagePath}
                                alt={route.name}
                                className="popularImage"
                            />
                            <div className="popularContent">
                                <p className="popularTitle">{route.name}</p>
                                <p className="popularInfo">Расстояние - {route.distance} м</p>
                                {/* Перевод сложности */}
                                <p className="popularInfo">Сложность - {difficultyTranslation[route.difficulty] || route.difficulty}</p>
                                <div className="tagContainer">{renderTags(route.categories)}</div>
                                <div className="like-container">
                                    <img
                                        onClick={(e) => {
                                            e.preventDefault(); // Чтобы предотвратить переход
                                            toggleLike(route.id);
                                        }}
                                        src={likedRoutes[route.id] ? "/icons/liked.svg" : "/icons/like.svg"}
                                        alt={likedRoutes[route.id] ? "Дизлайк" : "Лайк"}
                                        className="like-icon"
                                    />
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
