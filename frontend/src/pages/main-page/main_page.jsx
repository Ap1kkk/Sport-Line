import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon32SearchOutline, Icon56ClockCircleDashedOutline } from "@vkontakte/icons";
import { Card, CardScroll, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

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
        navigate("/");
    };

    const handleButtonClickHistory = () => {
        navigate("/history");
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <Icon56ClockCircleDashedOutline
                    onClick={handleButtonClickHistory}
                    width={32}
                    height={32}
                    color="#2975CC"
                />
                <h1 style={styles.title}>SportLine</h1>
                <Icon32SearchOutline onClick={handleButtonClickSearch} width={32} height={32} color="#2975CC" />
            </header>

            {/* Map Section */}
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
                        {Array.from({ length: 4 }).map((_, index) => (
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

            {/* Popular Section */}
            <div style={styles.popularSection}>
                <h3 style={styles.sectionTitle}>Популярные</h3>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} style={styles.popularCard}>
                        <img
                            src={`https://via.placeholder.com/150?text=Popular+Route+${index + 1}`}
                            alt={`Popular Route ${index + 1}`}
                            style={styles.popularImage}
                        />
                        <div style={styles.popularContent}>
                            <p style={styles.popularTitle}>Название маршрута</p>
                            <p style={styles.popularInfo}>Расстояние - 5 480</p>
                            <p style={styles.popularInfo}>Сложность - Средняя</p>
                            <div style={styles.tagContainer}>
                                <span style={styles.tag}>Бег</span>
                                <span style={styles.tag}>Туризм</span>
                                <span style={styles.tag}>С питомцем</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        height: "100vh",
        overflowY: "auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ddd",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
    },
    mapSection: {
        position: "relative",
        width: "100%",
        height: "300px",
        backgroundImage: "url('./iconsVk/галвный_экран_осн_02.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    mapOverlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        color: "#fff",
    },
    mapTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    mapButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    recommendedSection: {
        padding: "10px 20px",
        marginTop: "10px",
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    recommendedCard: {
        height: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        borderRadius: "8px",
        overflow: "hidden",
        marginRight: "10px",
    },
    cardImage: {
        width: "100%",
        height: "80px",
        objectFit: "cover",
    },
    cardText: {
        fontSize: "14px",
        fontWeight: "bold",
        marginTop: "5px",
    },
    popularSection: {
        padding: "10px 20px",
    },
    popularCard: {
        display: "flex",
        marginBottom: "15px",
        backgroundColor: "#f3f3f3",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    popularImage: {
        width: "120px",
        height: "120px",
        objectFit: "cover",
    },
    popularContent: {
        padding: "10px",
        flex: 1,
    },
    popularTitle: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    popularInfo: {
        fontSize: "14px",
        color: "#555",
        marginTop: "5px",
    },
    tagContainer: {
        marginTop: "10px",
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
    },
    tag: {
        padding: "5px 10px",
        backgroundColor: "#007BFF",
        color: "#fff",
        borderRadius: "15px",
        fontSize: "12px",
    },
};

export default MainPage;
