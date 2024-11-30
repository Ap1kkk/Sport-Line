import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useParams } from "react-router-dom";
import {BASE_API_URL} from "../../constants/globals";

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

const API_ROUTE_NAME = `${BASE_API_URL}/route`;
const API_START_URL = `${BASE_API_URL}/user/routes/start`;
const API_LEAVE_URL = `${BASE_API_URL}/user/routes/leave`;
const API_FINISH_URL = `${BASE_API_URL}/user/routes/finish`;
const API_LIKE_URL = `${BASE_API_URL}/user/routes/like`;
const API_UNLIKE_URL = `${BASE_API_URL}/user/routes/unlike`;

const RoutesOnMap = () => {
    const { routeId } = useParams();
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
    const [historyId, setHistoryId] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [completedCheckpoints, setCompletedCheckpoints] = useState([]);

    useEffect(() => {
        const fetchRouteData = async () => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    throw new Error("Authorization token is missing.");
                }

                const url = `${API_ROUTE_NAME}/by-id?id=${routeId}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRouteData(data);
                    setRouteDistance(data.distance);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
                setErrorMessage(error.message || "An error occurred.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRouteData();
    }, [routeId]);

    const updateRoute = () => {
        if (ymaps && mapInstance && routeData?.checkpoints?.length > 1) {
            const coords = routeData.checkpoints.map((checkpoint) => [
                checkpoint.latitude,
                checkpoint.longitude,
            ]);

            if (!coords || coords.length < 2) {
                console.error("Недостаточно данных для построения маршрута.");
                return;
            }

            mapInstance.geoObjects.removeAll();

            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: coords,
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

    useEffect(updateRoute, [ymaps, mapInstance, routeData]);

    const onYMapsLoad = (ymaps) => {
        console.log("Yandex Maps API загружен:", ymaps);
        setYmaps(ymaps);
    };

    useEffect(() => {
        let watchId;
        const startWatching = () => {
            if (navigator.geolocation) {
                console.log("navigator.geolocation.watchPosition(position)");
                navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCoords([latitude, longitude]);
                        console.log("Current position:", latitude, longitude);
                        if (mapInstance) {
                            mapInstance.setCenter([latitude, longitude], 16);
                        }
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                console.error("User denied the request for Geolocation.");
                                alert("Пожалуйста, разрешите доступ к геолокации в настройках браузера.");
                                break;
                            case error.POSITION_UNAVAILABLE:
                                console.error("Location information is unavailable.");
                                alert("Информация о местоположении недоступна.");
                                break;
                            case error.TIMEOUT:
                                console.error("The request to get user location timed out.");
                                alert("Тайм-аут запроса геолокации.");
                                break;
                            default:
                                console.error("An unknown error occurred.");
                                alert("Произошла неизвестная ошибка.");
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        maximumAge: 0,
                        timeout: 10000,
                    }
                );
            } else {
                alert("Геолокация не поддерживается вашим браузером.");
            }
        };
        startWatching();
        console.log("Начало отслеживани");
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [mapInstance]);

    // Функция для вычисления оставшегося расстояния до всех непройденных чекпоинтов
    const calculateRemainingDistance = () => {
        if (routeData) {
            let remainingDistance = 0;
            const remainingCheckpoints = routeData.checkpoints.filter(
                (checkpoint, index) => !completedCheckpoints.includes(index)
            );

            // Добавляем расстояние от текущей позиции до каждого непройденного чекпоинта
            remainingCheckpoints.forEach((checkpoint) => {
                const { latitude, longitude } = checkpoint;
                remainingDistance += calculateDistance(coords[0], coords[1], latitude, longitude);
            });

            return remainingDistance;
        }
        return 0;
    };

    useEffect(() => {
        if (routeData && coords.length === 2 && routeDistance > 0) {
            try {
                const startLat = routeData.checkpoints[0]?.latitude;
                const startLon = routeData.checkpoints[0]?.longitude;
                const lastCheckpoint = routeData.checkpoints[routeData.checkpoints.length - 1];
                const lastLat = lastCheckpoint.latitude;
                const lastLon = lastCheckpoint.longitude;

                const distanceToEnd = calculateRemainingDistance(coords[0], coords[1], lastLat, lastLon);

                const progress = Math.max(0, Math.min(100, (1 - distanceToEnd / routeDistance) * 100));
                setProgress(progress);

                if (startLat && startLon) {
                    const distanceToStart = calculateDistance(coords[0], coords[1], startLat, startLon);
                    setIsTooFar(distanceToStart > 60);

                    const averageSpeed = 1.39; // Средняя скорость в м/с
                    const timeInSeconds = routeDistance / averageSpeed;
                    const timeInMinutes = Math.ceil(timeInSeconds / 60);

                    setRealTimeInfo({
                        routeDistance: (routeDistance / 1000).toFixed(2),
                        time: timeInMinutes,
                    });
                }
            } catch (error) {
                console.error("Ошибка при обработке маршрута:", error);
            }
        }
    }, [routeDistance, coords, routeData]);

    const updateProgress = () => {
        if (routeData && routeDistance > 0) {
            const remainingDistance = calculateRemainingDistance();

            // Рассчитываем прогресс, используя инверсную логику (оставшееся расстояние от общего расстояния)
            const remainingProgress = (remainingDistance / routeDistance) * 100;

            // Прогресс будет уменьшаться, когда оставшееся расстояние уменьшается
            setProgress(remainingProgress); // Инверсный прогресс
        }
    };

    const sendStartRoute = async (progressData) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error("Authorization token is missing.");
            }

            const response = await fetch(`${API_START_URL}?routeId=${routeId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API response data:", data);
                if (data && data.id) {
                    setHistoryId(data.id);
                } else {
                    console.error("Error: History ID not found in the response.");
                }
            } else {
                console.error("Failed to start route. Response not OK:", response.statusText);
            }
        } catch (error) {
            console.error("Error sending progress update:", error);
        }
    };

    const sendLeaveRequest = async (progressData) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error("Authorization token is missing.");
            }

            const response = await fetch(`${API_LEAVE_URL}?historyId=${historyId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(progressData),
            });

            if (!response.ok) {
                throw new Error("Failed to send progress update.");
            }

            console.log("Progress updated successfully:", progressData);
        } catch (error) {
            console.error("Error sending progress update:", error);
        }
    };

    const sendFinishRequest = async (progressData) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error("Authorization token is missing.");
            }

            const response = await fetch(`${API_FINISH_URL}?historyId=${historyId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(progressData),
            });

            if (!response.ok) {
                throw new Error("Failed to send progress update.");
            }

            console.log("Progress updated successfully:", progressData);
        } catch (error) {
            console.error("Error sending progress update:", error);
        }
    };

    const handleStart = () => {
        console.log("Handle start. Coords: " + coords)
        if (!isTooFar) {
            setIsStarted(true);
            setErrorMessage("");
            sendStartRoute()

            setProgress(0);
            setCompletedCheckpoints([]);
            updateProgress();
        }
    };

    const toggleLike = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error("Authorization token is missing.");
            }

            if (isLiked) {
                const response = await fetch(`${API_UNLIKE_URL}?routeId=${routeId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    console.log("Лайк снят");
                    setIsLiked(false);
                } else {
                    console.error("Ошибка снятия лайка:", response.statusText);
                }
            } else {
                const response = await fetch(`${API_LIKE_URL}?routeId=${routeId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    console.log("Лайк поставлен");
                    setIsLiked(true);
                } else {
                    console.error("Ошибка постановки лайка:", response.statusText);
                }
            }
        } catch (error) {
            console.error("Ошибка при обработке лайка:", error);
        }
    };

    const handleFinish = async () => {
        if (routeData && coords.length === 2 && routeDistance > 0) {
            try {
                const lastCheckpoint = routeData.checkpoints[routeData.checkpoints.length - 1];
                const lastLat = lastCheckpoint.latitude;
                const lastLon = lastCheckpoint.longitude;

                if (lastLat && lastLon) {
                    const distanceToEnd = calculateDistance(coords[0], coords[1], lastLat, lastLon);
                    if (distanceToEnd > 60) {
                        sendLeaveRequest();
                    }
                    else {
                        sendFinishRequest();
                    }
                }
            } catch (error) {
                console.error("Error sending progress update:", error);
            }
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
                        {!isStarted && isTooFar && (
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
                                        <div>
                                            <div style={progressBarStyles.container}>
                                                <div
                                                    style={{
                                                        ...progressBarStyles.filler,
                                                        width: `${progress}%`,
                                                    }}
                                                >
                                                    <span style={progressBarStyles.label}>{progress.toFixed(1)}%</span>
                                                </div>
                                            </div>
                                            <p>Пройдено: {progress.toFixed(2)}%</p>
                                        </div>
                                        <p>Время: {realTimeInfo.time} мин</p>
                                    </>
                                ) : (
                                    <p>Загрузка данных маршрута...</p>
                                )}
                                <button onClick={handleFinish} style={styles.startButton}>
                                    Закончить
                                </button>
                                <button onClick={toggleLike} style={styles.button}>
                                    {isLiked ? "Убрать лайк" : "Поставить лайк"}
                                </button>
                            </div>
                        ) : (
                            <div style={styles.infoPanel}>
                                {realTimeInfo ? (
                                    <>
                                        <p>Расстояние маршрута: {realTimeInfo.routeDistance} км</p>
                                        <p>Время: {realTimeInfo.time} мин</p>
                                        <p>Сложность: {routeData.difficulty || "Не указана"}</p>
                                        <p>
                                            Категории:{" "}
                                            {routeData.categories && routeData.categories.length > 0
                                                ? routeData.categories.map((category) => category.name).join(", ")
                                                : "Нет категорий"}
                                        </p>
                                    </>
                                ) : (
                                    <p>Загрузка данных маршрута...</p>
                                )}
                                <button onClick={handleStart} style={styles.startButton}>
                                    Начать
                                </button>
                                <button onClick={toggleLike} style={styles.button}>
                                    {isLiked ? "Убрать лайк" : "Поставить лайк"}
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
        bottom: "250px",
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

export default RoutesOnMap;