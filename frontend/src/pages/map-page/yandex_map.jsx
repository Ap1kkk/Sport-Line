import {YMaps, Map, GeolocationControl} from '@pbe/react-yandex-maps';
import React from "react";

const YandexMap = () => {
    return (
        <YMaps query={{ apiKey: "71b4ede5-7042-4bba-9243-a2cb4b638bd5" }}>
            <div style={styles.container}>
                My awesome application with maps!
                <Map
                    defaultState={{
                        center: [56.315309, 43.993506],
                        zoom: 12,
                        controls: [],
                }}
                width={"1200px"}
                height={"700px"}>
                    <GeolocationControl options={{float: "left"}}/>
                </Map>
            </div>
        </YMaps>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '80%',
    }

}

export default YandexMap;