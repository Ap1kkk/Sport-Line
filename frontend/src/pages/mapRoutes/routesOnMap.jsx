import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

// Функция для вычисления расстояния между двумя точками на Земле
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Радиус Земли в метрах
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
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
    const [isLoading, setIsLoading] = useState(false);
    const [realTimeInfo, setRealTimeInfo] = useState(null);
    const [isTooFar, setIsTooFar] = useState(false);
    const [routeDistance, setRouteDistance] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [nextPointDistance, setNextPointDistance] = useState(null);

    const fetchRoute = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await fetch(
                `http://localhost:5000/routes?nameRoute=${routeName}`
            );
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

    useEffect(() => {
        if (ymaps && mapInstance && routeData && routeData.coords && routeData.coords.length > 1) {
            mapInstance.geoObjects.removeAll();

            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: routeData.coords,
                    params: { routingMode: "pedestrian" },
                },
                { boundsAutoApply: true }
            );

            mapInstance.geoObjects.add(multiRoute);

            multiRoute.model.events.add("update", () => {
                const activeRoute = multiRoute.getActiveRoute();
                if (activeRoute && activeRoute.properties) {
                    const routeDistance = activeRoute.properties.get("distance")?.value;
                    if (routeDistance !== undefined) {
                        setRouteDistance(routeDistance);
                    }
                }
            });

            const nextPointRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: [coords, routeData.coords[1]],
                    params: { routingMode: "pedestrian" },
                },
                { boundsAutoApply: true }
            );

            nextPointRoute.model.events.add("update", () => {
                const activeRoute = nextPointRoute.getActiveRoute();
                if (activeRoute && activeRoute.properties) {
                    const distanceNextPoint = activeRoute.properties.get("distance")?.value;
                    if (distanceNextPoint !== undefined) {
                        setNextPointDistance((distanceNextPoint / 1000).toFixed(2));  // Расстояние в километрах
                    }
                }
            });


            return () => {
                mapInstance.geoObjects.remove(multiRoute);
            };
        }
    }, [ymaps, mapInstance, routeData, coords]);

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
                        console.error("Ошибка получения геопозиции: ", error);
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

                setIsTooFar(distance > 100);

                if (distance <= 100) {
                    const averageSpeed = 1.39; // Средняя скорость в м/с
                    const timeInSeconds = routeDistance / averageSpeed;
                    const timeInMinutes = (timeInSeconds / 60).toFixed();

                    const difficulty = routeData.coords.length > 10 ? "Сложный" : "Легкий";

                    setRealTimeInfo({
                        routeDistance: (routeDistance / 1000).toFixed(1), // Дистанция маршрута в километрах
                        time: timeInMinutes,
                        difficulty,
                    });

                }
            } catch (error) {
                console.error("Ошибка при обработке маршрута или геопозиции:", error);
                setErrorMessage("Произошла ошибка при обработке данных маршрута.");
            }
        }
    }, [coords, routeData, routeDistance]);

    const handleSearch = () => {
        if (routeName.trim()) {
            fetchRoute();
        } else {
            setErrorMessage("Введите название маршрута.");
        }
    };

    const handleStart = () => {
        if (!isTooFar) {
            setIsStarted(true);
            setErrorMessage("");
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
                            <Placemark
                                geometry={coords}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: 'https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v51/icons/core/map-placemark-dot-32.svg',
                                }}
                            />
                            {routeData.coords.map((point, index) => (
                                <Placemark
                                    key={index}
                                    geometry={point}
                                    options={{
                                        iconLayout: "default#image",
                                        iconImageHref:
                                            "https://cdn-icons-png.flaticon.com/512/2776/2776063.png",
                                    }}
                                />
                            ))}
                        </Map>
                        <div>
                            {isTooFar && (
                                <div style={styles.errorMessageOverlay}>
                                    <p style={styles.errorText}>
                                        Вы слишком далеко от начала маршрута.
                                    </p>
                                </div>
                            )}

                            {isStarted ? (
                                <div style={styles.infoPanel}>
                                    <p>Дистанция до следующей точки: {nextPointDistance} км</p>
                                    {realTimeInfo ? (
                                        <>
                                            <p>Расстояние маршрута: {realTimeInfo.routeDistance} км</p>
                                            <p>Время: {realTimeInfo.time} мин</p>
                                        </>
                                    ) : (
                                        <p>Загрузка данных маршрута...</p>
                                    )}
                                    <button
                                        onClick={() => setIsStarted(false)}
                                        style={styles.startButton}
                                    >
                                        Закончить
                                    </button>
                                </div>
                            ) : (
                                <div style={styles.infoPanel}>
                                    {realTimeInfo ? (
                                        <>
                                            <p>Расстояние маршрута: {realTimeInfo.routeDistance} км</p>
                                            <p>Время: {realTimeInfo.time} мин</p>
                                            <p>Сложность: {realTimeInfo.difficulty}</p>
                                        </>
                                    ) : (
                                        <p>Загрузка данных маршрута...</p>
                                    )}
                                    <button onClick={handleStart} style={styles.startButton}>
                                        Начать
                                    </button>
                                </div>
                            )}
                        </div>

                    </YMaps>
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
    map: {
        zIndex: 1,
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
    },
    errorText: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "bold",
    },

    routeName: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    errorMessageOverlay: {
        position: "fixed",
        bottom: "300px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 1000,
    },
    infoPanel: {
        position: "fixed",
        bottom: "100px",
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
