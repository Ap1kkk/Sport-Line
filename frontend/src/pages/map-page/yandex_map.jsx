import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import React, { useEffect, useState } from "react";

const YandexMap = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [coords, setCoords] = useState([56.315309, 43.993506]);
    const [points, setPoints] = useState([]);
    const [route, setRoute] = useState(null);
    const [ymaps, setYmaps] = useState(null); // Добавляем состояние для ymaps

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

        // Удаление предыдущего маршрута, если он существует
        if (route) {
            mapInstance.geoObjects.remove(route);
        }

        // Создание нового маршрута
        const multiRoute = new ymaps.multiRouter.MultiRoute(
            { referencePoints },
            { boundsAutoApply: true }
        );

        // Добавление маршрута на карту
        mapInstance.geoObjects.add(multiRoute);
        setRoute(multiRoute);
    };

    const onYMapsLoad = (ymaps) => {
        console.log("Yandex Maps API загружен:", ymaps);
        setYmaps(ymaps); // Сохраняем объект ymaps в состоянии
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
                            iconImageSize: [30, 30],
                            iconImageOffset: [-15, -15],
                        }}
                    />

                    {points.map((point, index) => (
                        <Placemark
                            key={index}
                            geometry={point}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/2776/2776063.png',
                                iconImageSize: [40, 40],
                                iconImageOffset: [-20, -20],
                            }}
                        />
                    ))}
                </Map>
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
};

export default YandexMap;
