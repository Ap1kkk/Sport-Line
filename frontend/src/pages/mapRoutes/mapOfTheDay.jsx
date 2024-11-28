import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

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

const API_ROUTE_NAME = "http://localhost:8080/api/v1/route/daily"

const MapOfTheDay = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [ymaps, setYmaps] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [coords, setCoords] = useState([56.315309, 43.993506]);
    const [isLoading, setIsLoading] = useState(false);
    const [realTimeInfo, setRealTimeInfo] = useState(null);
    const [isTooFar, setIsTooFar] = useState(false);
    const [routeDistance, setRouteDistance] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchMapOfTheDay = async () => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const response = await fetch(API_ROUTE_NAME);
                if (response.ok) {
                    const data = await response.json();
                    setRouteData(data);
                } else {
                    setErrorMessage("Маршрут не найден");
                    setRouteData(null);
                }
            } catch (error) {
                console.error("Ошибка при загрузке категорий:", error);
            }
        };
        fetchMapOfTheDay();
    }, []);

    const updateRoute = () => {
        if (ymaps && mapInstance && routeData?.coords.length > 1) {
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
                if (activeRoute) {
                    const distance = activeRoute.properties.get("distance")?.value || 0;
                    setRouteDistance(distance);
                }
            });

            return () => {
                mapInstance.geoObjects.remove(multiRoute);
            };
        }
    };

    const findNearestPoint = (routeCoords, userCoords) => {
        let minDistance = Infinity;
        let nearestIndex = -1;

        routeCoords.forEach((point, index) => {
            const distance = calculateDistance(
                userCoords[0],
                userCoords[1],
                point[0],
                point[1]
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = index;
            }
        });

        return { nearestIndex, minDistance };
    };

    const calculateRemainingDistance = (routeCoords, startIndex) => {
        let remainingDistance = 0;

        for (let i = startIndex; i < routeCoords.length - 1; i++) {
            remainingDistance += calculateDistance(
                routeCoords[i][0],
                routeCoords[i][1],
                routeCoords[i + 1][0],
                routeCoords[i + 1][1]
            );
        }

        return remainingDistance;
    };

    useEffect(() => {
        if (routeData && coords.length === 2 && routeDistance > 0) {
            const geometry = routeData.coords; // Массив точек маршрута
            const { nearestIndex, minDistance } = findNearestPoint(geometry, coords);


            if (minDistance > 60) {
                const remainingDistance = calculateRemainingDistance(geometry, nearestIndex);
                const progress = ((routeDistance - remainingDistance) / routeDistance) * 100;
                setProgress(progress.toFixed(2)); // Обновляем прогресс
            }
        }
    }, [coords, routeData, routeDistance]);

    const onYMapsLoad = (ymaps) => {
        console.log("Yandex Maps API загружен:", ymaps);
        setYmaps(ymaps);
    };

    useEffect(updateRoute, [ymaps, mapInstance, routeData]);

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
            if (watchId) navigator.geolocation.clearWatch(watchId);
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

                    const difficulty =
                        routeData.coords.length > 10 ? "Сложный" : "Легкий";

                    setRealTimeInfo({
                        routeDistance: (routeDistance / 1000).toFixed(1),
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

    const handleStart = () => {
        if (!isTooFar) {
            setIsStarted(true);
            setErrorMessage("");
        }
    };

    return (
        <div style={styles.container}>
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
                            width={"400px"}
                            height={"700px"}
                            onLoad={(ymaps) => onYMapsLoad(ymaps)}
                        >
                            <Placemark
                                geometry={coords}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: 'https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v51/icons/core/map-placemark-dot-32.svg',
                                }}
                            />
                        </Map>
                    </YMaps>
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
                                {realTimeInfo ? (
                                    <>
                                        <p>Расстояние маршрута: {realTimeInfo.routeDistance} км</p>
                                        <div style={progressBarStyles.container}>
                                            <div
                                                style={{
                                                    ...progressBarStyles.filler,
                                                    width: `${progress}%`,
                                                }}
                                            >
                                                <span style={progressBarStyles.label}>{progress}%</span>
                                            </div>
                                        </div>
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
                </>
            ) : (
                <p>Ошибка загрузки маршрута.</p>
            )}
        </div>
    );
};

const progressBarStyles = {
    container: {
        height: "20px",
        width: "100%",
        backgroundColor: "#e0e0df",
        borderRadius: "5px",
        margin: "10px 0",
    },
    filler: {
        height: "100%",
        backgroundColor: "#007BFF",
        borderRadius: "inherit",
        textAlign: "center",
        transition: "width 0.2s ease-in-out",
    },
    label: {
        padding: "5px",
        color: "white",
        fontWeight: "bold",
    },
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
        padding: "10px 10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "10px",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
    },
    error: {
        color: "red",
    },
    errorText: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    routeName: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
        marginTop: "10px",
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
        width: "80%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 1000,
    },
    progressBarContainer: {
        position: "fixed",
        bottom: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        height: "30px",
        backgroundColor: "#f3f3f3",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#4caf50",
        transition: "width 0.5s ease",
    },
    progressText: {
        textAlign: "center",
        marginTop: "5px",
        fontSize: "14px",
        fontWeight: "bold",
    },

};

export default MapOfTheDay;
