import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon32SearchOutline, Icon56ClockCircleDashedOutline } from "@vkontakte/icons";
import { Card, CardScroll, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {BASE_API_URL} from "../../constants/globals";

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
        <div style={styles.container}>
            <header style={styles.header}>
                <Icon56ClockCircleDashedOutline
                    onClick={handleButtonClickHistory}
                    width={32}
                    height={32}
                    color="#2975CC"
                    style={styles.iconfromvk}
                />
                <h1 style={styles.title}>SportLine</h1>
                <Icon32SearchOutline
                    onClick={handleButtonClickSearch}
                    width={32}
                    height={32}
                    color="#2975CC"
                    style={styles.iconfromvk}
                />
            </header>
            <content styles = {styles.content}>
                <div style={styles.mapSection}>
                    <div style={styles.mapOverlay}>
                        <h2 style={styles.mapTitle}>Маршрут дня</h2>
                        <button style={styles.mapButton} onClick={handleButtonClickRouteOfTheDay}>
                            Поехали
                        </button>
                    </div>
                </div>

                {/* Recommended Routes */}
                <div style={styles.recommendedSection}>
                    <h3 style={styles.sectionTitle}>Рекомендуемые</h3>
                    <Group>
                        <CardScroll>
                            {Array.from({length: 4}).map((_, index) => (
                                <Card key={index} size="l" style={styles.recommendedCard}>
                                    <div>
                                        <img
                                            src={`https://via.placeholder.com/150?text=Route+${index + 1}`}
                                            alt={`Route ${index + 1}`}
                                            style={styles.cardImage}
                                        />
                                        <p style={styles.cardText}>Название маршрута</p>
                                    </div>
                                </Card>
                            ))}
                        </CardScroll>
                    </Group>
                </div>

                {/* Recommended Routes */}
                <div style={styles.recommendedSection}>
                    <h3 style={styles.sectionTitle}>Рекомендуемые</h3>
                    <Group>
                        <CardScroll>
                            {Array.from({length: 4}).map((_, index) => (
                                <Card key={index} size="l" style={styles.recommendedCard}>
                                    <div>
                                        <img
                                            src={`https://via.placeholder.com/150?text=Route+${index + 1}`}
                                            alt={`Route ${index + 1}`}
                                            style={styles.cardImage}
                                        />
                                        <p style={styles.cardText}>Название маршрута</p>
                                    </div>
                                </Card>
                            ))}
                        </CardScroll>
                    </Group>
                </div>

            </content>
        </div>
    );
};

const styles = {
    container: {
        position: "relative",
        width: "100%",
        backgroundImage: "url('/iconsVk/галвный_экран_осн_04.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    header: {
        position: "absolute",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255)",
        top: 0,
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        zIndex: 1,
    },
    iconfromvk: {
        cursor: "pointer",
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#333",
        letterSpacing: "1px",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "200px",
        paddingBottom: "200px",
    },
    mapSection: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
    },
    mapOverlay: {
        display: "flex",
        color: "#fff",
        flexDirection: "column",
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        paddingBottom: "200px",
},
    mapTitle: {
        fontSize: "24px",
        fontWeight: "regular",
        marginBottom: "15px",
    },
    mapButton: {
        padding: "15px 30px",
        fontSize: "18px",
        backgroundColor: "#2975CC",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },

};

export default MainPage;
