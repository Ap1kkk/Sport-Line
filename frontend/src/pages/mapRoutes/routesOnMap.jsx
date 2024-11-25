import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

// Функция для вычисления расстояния между двумя точками на Земле (используется формула Haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Радиус Земли в метрах
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Расстояние в метрах
};

const RoutesOnMap = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [ymaps, setYmaps] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [routeName, setRouteName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [coords, setCoords] = useState([56.315309, 43.993506]);
    const [isNearStart, setIsNearStart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [realTimeInfo, setRealTimeInfo] = useState(null);
    const [isTooFar, setIsTooFar] = useState(false);

    // Функция для получения маршрута по имени
    const fetchRoute = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await fetch(`http://localhost:5000/routes?nameRoute=${routeName}`);
            if (!response.ok) {
                throw new Error("Не удалось получить данные с сервера");
            }
            const data = await response.json();
            if (data.length > 0) {
                setRouteData(data[0]);
            } else {
                setErrorMessage("Маршрут с таким названием не найден.");
                setRouteData(null);
            }
        } catch (error) {
            console.error("Ошибка загрузки маршрута:", error);
            alert("Не удалось загрузить маршрут. Проверьте соединение с сервером.");
            setErrorMessage("Ошибка при загрузке маршрута");
        } finally {
            setIsLoading(false);
        }
    };

    // Загружаем маршрут и строим его на карте
    useEffect(() => {
        if (ymaps && mapInstance && routeData && routeData.coords.length > 1) {
            mapInstance.geoObjects.removeAll();

            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: routeData.coords,
                    params: { routingMode: "pedestrian" },
                },
                { boundsAutoApply: true }
            );

            mapInstance.geoObjects.add(multiRoute);

            return () => {
                mapInstance.geoObjects.remove(multiRoute);
            };
        }
    }, [ymaps, mapInstance, routeData]);


    const onYMapsLoad = (ymapsInstance) => {
        if (ymapsInstance) {
            setYmaps(ymapsInstance);
        } else {
            console.error("Ошибка при загрузке Yandex Maps API.");
            setErrorMessage("Не удалось загрузить карту.");
        }
    };

    // Функция для отслеживания геопозиции пользователя
    useEffect(() => {
        let watchId;
        const startWatching = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCoords([latitude, longitude]);
                        if (mapInstance) {
                            mapInstance.setCenter([latitude, longitude], 16);
                        }
                    },
                    (error) => {
                        console.error('Ошибка получения геопозиции: ', error);
                        alert("Не удалось получить вашу геопозицию.");
                    },
                    {
                        enableHighAccuracy: true,
                        maximumAge: 0,
                        timeout: 1000,
                    }
                );
            } else {
                alert("Геолокация не поддерживается вашим браузером.");
            }
        };

        startWatching();
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [mapInstance]);

    useEffect(() => {
        if (routeData && coords.length === 2 && routeData.coords?.length > 0) {
            try {
                const distance = calculateDistance(
                    coords[0],
                    coords[1],
                    routeData.coords[0][0],
                    routeData.coords[0][1]
                );

                setIsNearStart(distance <= 100); // Ближе 100 м к началу маршрута
                setIsTooFar(distance > 100); // Если дальше 100 м от начала

                if (distance <= 100) {
                    const averageSpeed = 1.39; // Средняя скорость (пешеходная)
                    const timeInSeconds = distance / averageSpeed;
                    const timeInMinutes = (timeInSeconds / 60).toFixed(2);

                    const difficulty = routeData.coords.length > 10 ? "Сложный" : "Легкий";

                    setRealTimeInfo({
                        distance: (distance / 1000).toFixed(2),
                        time: timeInMinutes,
                        difficulty,
                    });
                }
            } catch (error) {
                console.error("Ошибка при обработке маршрута или геопозиции:", error);
                setErrorMessage("Произошла ошибка при обработке данных маршрута.");
            }
        }
    }, [coords, routeData]);

    // Функция для обработки поиска маршрута
    const handleSearch = () => {
        if (routeName.trim()) {
            fetchRoute();
        } else {
            setErrorMessage("Введите название маршрута.");
        }
    };

    // Функция для обработки нажатия на кнопку "Старт"
    const handleStart = () => {
        if (!isTooFar) {
            console.log("Маршрут стартовал!");
        } else {
            setErrorMessage("Вы слишком далеко от начала маршрута.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Введите название маршрута"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSearch} style={styles.button}>
                    Показать маршрут
                </button>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Загрузка маршрута...</p>
            ) : routeData ? (
                    <>
                    <h2 style={styles.routeName}>{routeData.nameRoute}</h2>
                    <YMaps
                        query={{
                            apikey: "71b4ede5-7042-4bba-9243-a2cb4b638bd5",
                            lang: "ru_RU",
                            load: "package.full",
                        }}
                    >
                        <Map
                            instanceRef={(ref) => setMapInstance(ref)}
                            defaultState={{
                                center: [56.315309, 43.993506],
                                zoom: 12,
                                controls: [],
                            }}
                            width={"1000px"}
                            height={"800px"}
                            onLoad={(ymaps) => onYMapsLoad(ymaps)}
                        >
                            {/* Маркер для геолокации пользователя */}
                            <Placemark
                                geometry={coords}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: 'https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v51/icons/core/map-placemark-dot-32.svg',
                                }}
                            />
                            {/* Отображение точек маршрута */}
                            {routeData.coords.map((point, index) => (
                                <Placemark
                                    key={index}
                                    geometry={point}
                                    options={{
                                        iconLayout: "default#image",
                                        iconImageHref: "https://cdn-icons-png.flaticon.com/512/2776/2776063.png",
                                    }}
                                />
                            ))}
                        </Map>
                    </YMaps>

                    {/* Кнопка "Старт", которая появляется, когда пользователь рядом с маршрутом */}
                    {isNearStart && !isTooFar && realTimeInfo && (
                        <div>
                            <button onClick={handleStart} style={styles.startButton}>
                                Старт
                            </button>
                            <div style={styles.infoPanel}>
                                <p>Расстояние: {realTimeInfo.distance} км</p>
                                <p>Время: {realTimeInfo.time} мин</p>
                                <p>Сложность: {realTimeInfo.difficulty}</p>
                            </div>
                        </div>
                    )}

                    {/* Сообщение, если пользователь слишком далеко от маршрута */}
                    {isTooFar && <p style={styles.error}>Вы слишком далеко от начала маршрута.</p>}
                </>
            ) : (
                <p>Введите название маршрута и нажмите кнопку "Показать маршрут".</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    inputContainer: {
        marginBottom: "20px",
        textAlign: "center",
    },
    input: {
        padding: "10px",
        width: "300px",
        marginRight: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    startButton: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "20px",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
    routeName: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    infoPanel: {
        position: "fixed",
        bottom: "170px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 1000,
    },
};

export default RoutesOnMap;
