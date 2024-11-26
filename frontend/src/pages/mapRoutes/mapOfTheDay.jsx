import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapOfTheDay = () => {
    const [mapInstance, setMapInstance] = useState(null);
    const [ymaps, setYmaps] = useState(null);
    const [routeData, setRouteData] = useState(null); // Данные маршрута

    const routeName = "Example 1";

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch(`http://localhost:5000/routes?nameRoute=${routeName}`);
                const data = await response.json();

                if (data.length > 0) {
                    setRouteData(data[0]);
                } else {
                    console.error("Маршрут с указанным названием не найден.");
                }
            } catch (error) {
                console.error("Ошибка загрузки маршрута:", error);
                alert("Не удалось загрузить маршрут. Проверьте соединение с сервером.");
            }
        };

        fetchRoute();
    }, [routeName]);

    useEffect(() => {
        if (ymaps && mapInstance && routeData && routeData.coords.length > 1) {
            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: routeData.coords,
                    params: { routingMode: "pedestrian" },
                },
                { boundsAutoApply: true }
            );

            mapInstance.geoObjects.removeAll();
            mapInstance.geoObjects.add(multiRoute);
        }
    }, [ymaps, mapInstance, routeData]);

    const onYMapsLoad = (ymapsInstance) => {
        console.log("Yandex Maps API загружен:", ymapsInstance);
        setYmaps(ymapsInstance);
    };

    return (
        <div style={styles.container}>
            {routeData ? (
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
                                center: routeData.coords[0],
                                zoom: 12,
                                controls: [],
                            }}
                            width={"1000px"}
                            height={"800px"}
                            onLoad={onYMapsLoad}
                        >
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
                </>
            ) : (
                <p>Загрузка маршрута...</p>
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
    routeName: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
};

export default MapOfTheDay;
