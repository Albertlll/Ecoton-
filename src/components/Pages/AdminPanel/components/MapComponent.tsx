import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const MapComponent: React.FC = () => {
  const mapState = {
    center: [55.751574, 37.573856], // Moscow coordinates
    zoom: 9,
  };

  const placemarks = [
    { coordinates: [55.751574, 37.573856], name: "Центральный парк", rating: 4.7 },
    { coordinates: [55.741574, 37.653856], name: "Наташинский парк", rating: 4.6 },
    { coordinates: [55.761574, 37.593856], name: "Парк Сказок", rating: 4.8 },
  ];

  return (
    <YMaps>
        <Map
        width="100%"
        height="100%"
        defaultState={{
          center: [55.75, 37.57],
          zoom: 9,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
      >
        <Placemark
          modules={["geoObject.addon.balloon"]}
          defaultGeometry={[55.75, 37.57]}
          properties={{
            balloonContentBody:
              "This is balloon loaded by the Yandex.Maps API module system",
          }}
        />
      </Map>
    </YMaps>
  );
};

export default MapComponent;