import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = () => {
    return (
        <div style={styles.container}>
            {/* Заголовок */}
            <header style={styles.header}>
                <div style={styles.square}></div>
                <h1 style={styles.title}>SportLine</h1>
                <div style={styles.square}></div>
            </header>

            {/* Основной контент */}
            <main style={styles.mainContent}>
                <h2 style={styles.subtitle}>Маршрут дня</h2>
                <button style={styles.button}>Поехали</button>

                <h3 style={styles.recommendationTitle}>Рекомендуемые</h3>
                <div style={styles.sliderContainer}>
                    <Slider {...sliderSettings}>
                        <div style={styles.card}>Карточка 1</div>
                        <div style={styles.card}>Карточка 2</div>
                        <div style={styles.card}>Карточка 3</div>
                        <div style={styles.card}>Карточка 4</div>
                        <div style={styles.card}>Карточка 5</div>
                    </Slider>
                </div>

                <h3 style={styles.recommendationTitleP}>Популярное</h3>
                <div style={styles.cards}>
                    <div style={styles.cardp}>Карточка 1</div>
                    <div style={styles.cardp}>Карточка 2</div>
                    <div style={styles.cardp}>Карточка 3</div>
                    <div style={styles.cardp}>Карточка 4</div>
                    <div style={styles.cardp}>Карточка 5</div>
                    <div style={styles.cardp}>Карточка 6</div>
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ddd',
    },
    square: {
        width: '40px',
        height: '40px',
        backgroundColor: '#ddd',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '20px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ddd',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '30px',
    },
    cards: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        flexWrap: 'wrap',
    },
    recommendationTitle: {
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
    },
    sliderContainer: {
        width: "80%",
        margin: "20px auto",
    },
    card: {
        backgroundColor: "#f5f5f5",
        height: "150px",
        margin: "10px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    recommendationTitleP: {
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
    },
    cardsP: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        maxHeight: "400px",
        overflowY: "auto",
        padding: "10px",
    },
    cardp: {
        backgroundColor: "#f5f5f5",
        width: "90%",
        maxWidth: "400px",
        height: "100px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    arrow: {
        display: "block",
        background: "#ccc",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        lineHeight: "60px",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
    },
    prevArrow: {
        left: "-40px",
    },
    nextArrow: {
        right: "-40px",
    },
};

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}`}
            style={{ ...styles.arrow, ...styles.prevArrow }}
            onClick={onClick}
        >
            ◀
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}`}
            style={{ ...styles.arrow, ...styles.nextArrow }}
            onClick={onClick}
        >
            ▶
        </div>
    );
};

const sliderSettings = {
    dots: true, // Показывать точки навигации
    infinite: true, // Зацикленный слайдер
    speed: 500, // Скорость перехода
    slidesToShow: 3, // Количество карточек, показываемых одновременно
    slidesToScroll: 1, // Сколько карточек прокручивать за раз
    nextArrow: <CustomNextArrow />, // Кастомная стрелка вправо
    prevArrow: <CustomPrevArrow />, // Кастомная стрелка влево
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2, // На маленьких экранах
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1, // На очень маленьких экранах
            },
        },
    ],
};

export default MainPage;