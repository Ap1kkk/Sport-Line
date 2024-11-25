import React from "react";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MainPage = () => {
    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate("/main_page/mapOfTheDay");
    };

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <header style={styles.header}>
                <div style={styles.square}></div>
                <h1 style={styles.title}>SportLine</h1>
                <div style={styles.square}></div>
            </header>

            {/* Main Content */}
            <main style={styles.mainContent}>
                <div style={styles.contentContainer}>
                    <h2 style={styles.subtitle}>Маршрут дня</h2>
                    <button style={styles.button} onClick={handleButtonClick}>Поехали</button>
                </div>

                {/* Recommended Slider Section */}
                <div style={styles.sliderSection}>
                    <h3 style={styles.recommendationTitle}>Рекомендуемые</h3>
                    <div style={styles.sliderContainer}>
                        <Slider {...sliderSettings}>
                            <div style={styles.card}>
                                <img
                                    src="https://img.icons8.com/color-glass/96/owl.png"
                                    alt="Example"
                                    style={styles.cardImage}
                                />
                            </div>
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
                                alt="Example"
                                style={styles.cardImage}
                            />
                            <img
                                src="https://img.icons8.com/color-glass/96/owl.png"
                                alt="Example"
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
        backgroundColor: "#efefef",
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
    square: {
        width: "40px",
        height: "40px",
        backgroundColor: "#ddd",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
    },
    mainContent: {
        flex: 1,
        padding: "20px",
        textAlign: "center",
        overflowY: "auto",
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
        maxWidth: "1000px",
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
    cardImage: {
        width: "300px",
        height: "300px",
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
    arrow: {
        display: "flex",
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
    },
    prevArrow: {
        left: "-30px",
    },
    nextArrow: {
        right: "-30px",
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

// Custom Arrows for the Slider
const CustomNextArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            style={{ ...styles.arrow, ...styles.nextArrow, ...style }}
            onClick={onClick}
        >
            ▶
        </div>
    );
};

const CustomPrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            style={{ ...styles.arrow, ...styles.prevArrow, ...style }}
            onClick={onClick}
        >
            ◀
        </div>
    );
};

// Slider settings
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            },
        },
    ],
};

export default MainPage;
