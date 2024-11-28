import React, {useState} from "react";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = () => {
    const navigate = useNavigate();
    const [routeData, setRouteData] = useState(null);

    const handleButtonClickRouteOfTheDay = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error("Authorization token is missing.");
            }
            const response = await fetch("http://localhost:8080/api/v1/route/daily", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRouteData(data);
                const routeId = data.id;

                console.log("Route ID: ", routeId);

                navigate(`/map/${routeId}`);
            } else {
                throw new Error("Route not found or API error.");
            }
        } catch (error) {
            console.error("Error fetching route data:", error);
        }
    };

    const handleButtonClickSearch = () => {
        navigate("/map");
    };

    const handleButtonClickHistory = () => {
        navigate("/history");
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <img
                    src="https://img.icons8.com/?size=100&id=6904&format=png&color=000000"
                    alt="UserHistory Icon"
                    style={styles.icon}
                    onClick={handleButtonClickHistory}
                />
                <h1 style={styles.title}>SportLine</h1>
                <img
                    src="https://img.icons8.com/?size=100&id=59878&format=png&color=000000"
                    alt="Search Icon"
                    style={styles.icon}
                    onClick={handleButtonClickSearch}
                />
            </header>

            {/* Central Map */}
            <div style={styles.mapContainer}>
                <h2 style={styles.mapTitle}>Маршрут дня</h2>
                <button style={styles.mapButton} onClick={handleButtonClickRouteOfTheDay}>
                    Поехали
                </button>
            </div>

            {/* Main Content */}
            <main>
                {/* Recommended Slider Section */}
                <div style={styles.sliderSection}>
                    <h3 style={styles.recommendationTitle}>Рекомендуемые</h3>
                    <div style={styles.sliderContainer}>
                        <Slider {...sliderSettings}>
                            <img
                                src="https://img.icons8.com/color-glass/96/owl.png"
                                alt="Example"
                                style={styles.cardImage}
                            />

                            <img
                                src="https://img.icons8.com/color-glass/96/owl.png"
                                alt="Example"
                                style={styles.cardImage}
                            />
                            <img
                                src="https://img.icons8.com/color-glass/96/owl.png"
                                style={styles.cardImage}
                            />
                            <img
                                src="https://img.icons8.com/color-glass/96/owl.png"
                                style={styles.cardImage}
                            />
                            <img
                                src="https://img.icons8.com/color-glass/96/owl.png"
                                style={styles.cardImage}
                            />
                        </Slider>
                    </div>
                </div>

                {/* Popular Section */}
                <h3 style={styles.popularTitle}>Популярное</h3>
                <div style={styles.cardsContainer}>
                    <div style={styles.cardPopular}>Карточка 1</div>
                    <div style={styles.cardPopular}>Карточка 2</div>
                    <div style={styles.cardPopular}>Карточка 3</div>
                    <div style={styles.cardPopular}>Карточка 4</div>
                    <div style={styles.cardPopular}>Карточка 5</div>
                    <div style={styles.cardPopular}>Карточка 6</div>
                    <div style={styles.cardPopular}>Карточка 7</div>
                    <div style={styles.cardPopular}>Карточка 8</div>
                </div>
            </main>
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
        top: 0,
        zIndex: 1000,
    },
    icon: {
        width: "30px",
        height: "30px",
        cursor: "pointer",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
    },
    mapContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/main_page/Nizhniy_Novgorod.png')",
        backgroundPosition: "center",
        textAlign: "center",
    },
    mapTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#000",
        marginBottom: "20px",
    },
    mapButton: {
        padding: "10px 20px",
        fontSize: "18px",
        backgroundColor: "#007BFF",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    contentContainer: {
        marginBottom: "20px",
    },
    subtitle: {
        fontSize: "20px",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#ddd",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "30px",
    },
    sliderSection: {
        marginTop: "40px",
        padding: "0 20px",
    },
    sliderContainer: {
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative",
    },
    card: {
        backgroundColor: "#684c4c",
        border: "1px solid #ddd",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#000000",
    },
    popularTitle: {
        marginTop: "30px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        margin: "60px",
    },
    cardPopular: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        width: "200px",
        height: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
    },
    recommendationTitle: {
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
    },
    footer: {
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        position: "relative",
    },
};

// Slider settings
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                arrows: false,
            },
        },
    ],
};

export default MainPage;
