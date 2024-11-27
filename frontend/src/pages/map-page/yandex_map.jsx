import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import React, { useEffect, useState } from "react";

const API_ROUTE_URL = "http://localhost:8080/api/v1/admin/route/create";

const YandexMap = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [coords, setCoords] = useState([56.315309, 43.993506]);
    const [points, setPoints] = useState([]);
    const [route, setRoute] = useState(null);
    const [ymaps, setYmaps] = useState(null);
    const [routeName, setRouteName] = useState("");
    const [routeDistance, setRouteDistance] = useState(0);
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");

    const handleClick = (e) => {
        const [latitude, longitude] = e.get("coords");
        const newPoint = [latitude, longitude];

        setPoints((prevPoints) => {
            const updatedPoints = [...prevPoints, newPoint];
            if (updatedPoints.length >= 2 && ymaps) {
                createRoute(updatedPoints);
            }
            return updatedPoints;
        });
    };

    const createRoute = (pointsArray) => {
        if (!ymaps || !mapInstance) {
            console.error("Карта или ymaps не готовы.");
            return;
        }

        const referencePoints = pointsArray.map((point) =>
            Array.isArray(point) ? point : [point.latitude, point.longitude]
        );

        if (route) {
            mapInstance.geoObjects.remove(route);
        }

        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints,
                params: { routingMode: "pedestrian" },
            },
            { boundsAutoApply: true }
        );

        multiRoute.model.events.add("update", () => {
            const activeRoute = multiRoute.getActiveRoute();
            if (activeRoute) {
                const distance = activeRoute.properties.get("distance").value;
                setRouteDistance(distance);
            }
        });

        mapInstance.geoObjects.add(multiRoute);
        setRoute(multiRoute);
    };

    const onYMapsLoad = (ymaps) => {
        console.log("Yandex Maps API загружен:", ymaps);
        setYmaps(ymaps);
    };

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
                        console.error('Error getting geolocation: ', error);
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

    const handleNameChange = (e) => {
        setRouteName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    const saveRoute = async () => {
        if (!routeName || points.length < 2) {
            alert("Введите название маршрута и добавьте минимум две точки.");
            return;
        }

        if (nameError) {
            alert("Пожалуйста, исправьте ошибки перед сохранением.");
            return;
        }

        try {
            const checkpoints = points.map(([latitude, longitude], index) => ({
                id: 0,
                index,
                latitude,
                longitude,
            }));

            const routeData = {
                id: 0,
                name: routeName,
                description,
                difficulty,
                distance: routeDistance,
                duration: 0,
                categoryIds: [],
                checkpoints,
                image: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    path: "string",
                    displayOrder: 0,
                },
            };

            const response = await fetch(API_ROUTE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(routeData),
            });

            if (response.ok) {
                alert("Маршрут успешно сохранен!");
                setRouteName("");
                setDescription("");
                setPoints([]);
                setRouteDistance(0);
                setDifficulty("EASY");
                if (route) {
                    mapInstance.geoObjects.remove(route);
                    setRoute(null);
                }
            } else {
                alert("Ошибка при сохранении маршрута.");
            }
        } catch (error) {
            console.error("Ошибка отправки данных:", error);
            alert("Не удалось сохранить маршрут. Проверьте соединение с сервером.");
        }
    };

    return (
        <YMaps
            query={{
                apikey: "71b4ede5-7042-4bba-9243-a2cb4b638bd5",
                lang: "ru_RU",
                load: "package.full",
            }} >
            <div style={styles.container}>
                <Map
                    instanceRef={(ref) => setMapInstance(ref)}
                    defaultState={{
                        center: [56.315309, 43.993506],
                        zoom: 12,
                        controls: [],
                    }}
                    width={"1000px"}
                    height={"800px"}
                    onClick={handleClick}
                    onLoad={(ymaps) => onYMapsLoad(ymaps)}
                >
                    <Placemark
                        geometry={coords}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: 'https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v51/icons/core/map-placemark-dot-32.svg',
                        }}
                    />

                    {points.map((point, index) => (
                        <Placemark
                            key={index}
                            geometry={point}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/2776/2776063.png',
                            }}
                        />
                    ))}
                </Map>
                <div style={styles.controls}>
                    <input
                        type="text"
                        placeholder="Введите название маршрута"
                        value={routeName}
                        onChange={handleNameChange}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Введите описание маршрута"
                        value={description}
                        onChange={handleDescriptionChange}
                        style={styles.textarea}
                    />
                    <select value={difficulty} onChange={handleDifficultyChange} style={styles.select}>
                        <option value="EASY">Легкий</option>
                        <option value="MEDIUM">Средний</option>
                        <option value="HARD">Сложный</option>
                    </select>
                    {nameError && <p style={styles.error}>{nameError}</p>}
                    <button style={styles.button} onClick={saveRoute}>
                        Сохранить маршрут
                    </button>
                </div>
                <div style={styles.routeInfo}>
                    <h3>Информация о маршруте:</h3>
                    {routeDistance > 0 ? (
                        <p>Общее расстояние: {(routeDistance / 1000).toFixed(2)} км</p>
                    ) : (
                        <p>Добавьте точки, чтобы увидеть расстояние.</p>
                    )}
                </div>
                <div style={styles.coordinatesList}>
                    <h3>Координаты точек:</h3>
                    <ul>
                        {points.map(([lat, lon], index) => (
                            <li key={index}>
                                Точка {index + 1}: {lat.toFixed(6)}, {lon.toFixed(6)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </YMaps>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '800px',
    },
    controls: {
        marginTop: "20px",
        textAlign: "center",
        width: "80%",
    },
    coordinatesList: {
        marginTop: "20px",
        textAlign: "left",
        width: "80%",
    },
    routeInfo: {
        marginTop: "20px",
        textAlign: "center",
    },
    input: {
        marginTop: "10px",
        padding: "10px",
        width: "60%",
    },
    textarea: {
        marginTop: "10px",
        padding: "10px",
        width: "60%",
        height: "80px",
    },
    select: {
        marginTop: "10px",
        padding: "10px",
        width: "60%",
    },
    button: {
        marginTop: "10px",
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
};

export default YandexMap;
