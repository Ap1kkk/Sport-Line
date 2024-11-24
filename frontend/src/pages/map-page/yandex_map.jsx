import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import React, { useEffect, useState } from "react";

const YandexMap = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [coords, setCoords] = useState([56.315309, 43.993506]);
    const [points, setPoints] = useState([]);
    const [route, setRoute] = useState(null);
    const [ymaps, setYmaps] = useState(null);
    const [routeName, setRouteName] = useState("");
    const [routeDistance, setRouteDistance] = useState(0);

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
                    onLoad={(ymaps) => onYMapsLoad(ymaps)} // Передаем ymaps
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
                        onChange={(e) => setRouteName(e.target.value)}
                        style={styles.input}
                    />
                    <button style={styles.button}>
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
        marginTop: "20px",
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
};

export default YandexMap;
