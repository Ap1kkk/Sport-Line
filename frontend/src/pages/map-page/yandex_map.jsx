import { YMaps, Map, GeolocationControl, Placemark } from '@pbe/react-yandex-maps';
import React, { useState } from "react";

const YandexMap = () => {

    const [mapInstance, setMapInstance] = useState(null);
    const [coords, setCoords] = useState(null)

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoords([latitude, longitude])
                    mapInstance.setCenter([latitude, longitude], 12);
                },
                (error) => {
                    console.error('Error getting geolocation: ', error);
                    alert("Не удалось получить вашу геопозицию.");
                }
            );
        } else {
            alert("Геолокация не поддерживается вашим браузером.");
        }
    };

    return (
        <YMaps query={{ apiKey: "71b4ede5-7042-4bba-9243-a2cb4b638bd5" }}>
            <div style={styles.container}>
                <Map
                    instanceRef={(ref) => setMapInstance(ref)}
                    defaultState={{
                        center: [56.315309, 43.993506],
                        zoom: 12,
                        controls: [],
                    }}
                    width={"800px"}
                    height={"700px"}>

                    <Placemark
                        geometry={coords}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: 'https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v51/icons/core/map-placemark-dot-32.svg',
                            iconImageSize: [30, 30],
                            iconImageOffset: [-10, -10],
                        }}
                    />

                    <GeolocationControl onClick={handleGeolocation}>
                    </GeolocationControl>
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
    button: {
        margin: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    }
}

export default YandexMap;