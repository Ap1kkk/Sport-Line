import { YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import React, { useEffect, useState } from "react";

const YandexMap = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [coords, setCoords] = useState([56.315309, 43.993506]);
    const [points, setPoints] = useState([]);
    const [route, setRoute] = useState(null);
    const [ymapsLoaded, setYmapsLoaded] = useState(false);

    const handleClick = (e) => {
        const [latitude, longitude] = e.get("coords");
        const newPoint = [latitude, longitude]; // Массив вместо объекта

        setPoints((prevPoints) => {
            const updatedPoints = [...prevPoints, newPoint];
            if (updatedPoints.length >= 2 && ymapsLoaded) {
                createRoute(updatedPoints); // Передаём массив точек
            }
            return updatedPoints;
        });
    };

    const createRoute = (pointsArray) => {
        if (!ymapsLoaded || !mapInstance || !window.ymaps?.multiRouter) {
            console.error("Карта или multiRouter модуль не готовы.");
            return;
        }

        const referencePoints = pointsArray.map((point) =>
            Array.isArray(point) ? point : [point.latitude, point.longitude]
        );

        const multiRoute = new window.ymaps.multiRouter.MultiRoute(
            { referencePoints },
            { boundsAutoApply: true }
        );

        if (route) {
            mapInstance.geoObjects.remove(route);
        }

        mapInstance.geoObjects.add(multiRoute);
        setRoute(multiRoute);
    };

    const onYMapsLoad = (ymaps) => {
        console.log("Yandex Maps API загружен:", ymaps);
        if (ymaps.multiRouter) {
            setYmapsLoaded(true);
            console.log("multiRouter успешно загружен.");
        } else {
            console.error("Модуль multiRouter недоступен в загруженной версии API.");
        }
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
                    onLoad={(ymaps) => onYMapsLoad(ymaps)}
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
