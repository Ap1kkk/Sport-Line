import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useParams } from "react-router-dom";
import {BASE_API_URL} from "../../constants/globals";

import './routesOnMap.css'; // Импорт CSS-файла

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
    const findNextCheckpoint = () => {
        if (routeData) {
            const remainingCheckpoints = routeData.checkpoints.filter(
                (checkpoint, index) => !completedCheckpoints.includes(index)
            );
            return remainingCheckpoints[0]; // Возвращаем первый непройденный чекпоинт
        }
        return null;
    };

    const updateProgress = () => {
        if (routeData && routeDistance > 0 && coords.length === 2) {
            let totalDistanceCovered = 0;
            let completedCheckpointsCount = 0;

            // Пройденное расстояние между точками
            routeData.checkpoints.forEach((checkpoint, index) => {
                const { latitude, longitude } = checkpoint;
                const distanceToCheckpoint = calculateDistance(coords[0], coords[1], latitude, longitude);

                // Если пользователь близок к чекпоинту, считаем его пройденным
                if (distanceToCheckpoint < 20 && !completedCheckpoints.includes(index)) {
                    setCompletedCheckpoints((prev) => [...prev, index]);
                    completedCheckpointsCount++;
                }

                // Добавляем расстояние до текущего чекпоинта
                if (completedCheckpointsCount <= index) {
                    totalDistanceCovered += distanceToCheckpoint;
                }
            });

            // Расстояние, которое осталось пройти
            const remainingDistance = routeDistance - totalDistanceCovered;

            // Прогресс
            const newProgress = Math.max(0, Math.min(100, (remainingDistance / routeDistance) * 100));
            setProgress(newProgress);
        }
    };

    useEffect(() => {
        if (isStarted) {
            updateProgress();
        }
    }, [coords, isStarted, completedCheckpoints, routeData]);

    useEffect(() => {
        if (routeData && coords.length === 2 && routeDistance > 0) {
            try {
                const startLat = routeData.checkpoints[0]?.latitude;
                const startLon = routeData.checkpoints[0]?.longitude;

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
            sendStartRoute()

            setProgress(0);
            setCompletedCheckpoints([]);
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
        <div className="container">
            {isLoading ? (
                <p>Загрузка маршрута...</p>
            ) : routeData ? (
                <>
                    <h2 className="routeName">{routeData.nameRoute}</h2>
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
                                center: coords,
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
                            <div className="errorMessageOverlay">
                                <p className="errorText">
                                    Вы слишком далеко от начала маршрута.
                                </p>
                            </div>
                        )}

                        {isStarted ? (
                            <div className="infoPanel">
                                {realTimeInfo ? (
                                    <>
                                        <p>Расстояние маршрута: {realTimeInfo.routeDistance} км</p>
                                        <div>
                                            <div className="progressBarContainer">
                                                <div
                                                    className="progressBarFiller"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                >
                                                    <span className="progressLabel">{progress.toFixed(2)}%</span>
                                                </div>
                                            </div>
                                            <p>Пройдено: {progress.toFixed(2)}%</p>
                                        </div>
                                        <p>Время: {realTimeInfo.time} мин</p>
                                    </>
                                ) : (
                                    <p>Загрузка данных маршрута...</p>
                                )}
                                <button onClick={handleFinish} className="startButton">
                                    Закончить
                                </button>
                                <button onClick={toggleLike} className="button">
                                    {isLiked ? "Убрать лайк" : "Поставить лайк"}
                                </button>
                            </div>
                        ) : (
                            <div className="infoPanel">
                                {realTimeInfo ? (
                                    <div>
                                        <div className="sett">
                                            <div>
                                            <p className="h">Расстояние: </p>
                                            <p>{realTimeInfo.routeDistance} км</p>
                                            </div><div>
                                            <p className="h">Время: </p>
                                            <p>{realTimeInfo.time} мин</p>
                                            </div><div>
                                            <p className="h">Сложность: </p>
                                            <p>{routeData.difficulty || "Не указана"}</p>
                                            </div>
                                        </div>
                                        <div className="categories">
                                            {routeData.categories && routeData.categories.length > 0 ? (
                                                routeData.categories.map((category, index) => (
                                                    <p key={index} className="categ">{category.name}</p>
                                                ))
                                            ) : (
                                                <p className="categ">Нет категорий</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Загрузка данных маршрута...</p>
                                )}
                                <div className="buttons_map">
                                <p onClick={handleStart} className="startButton">
                                    Начать
                                </p>
                                <img    onClick={toggleLike}
                                        src={"/icons/like.svg"}
                                        alt={"Лайк"} 
                                        className="like-icon" 
                                    />
                                </div>
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

export default RoutesOnMap;
