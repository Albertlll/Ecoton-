import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, Rectangle } from '@pbe/react-yandex-maps';
import { instanceAxios } from '../../../../../httpConfig';

const MapComponent: React.FC = () => {
  const mapState = {
    center: [55.751574, 37.573856], // Moscow coordinates
    zoom: 9,
  };



  
  const statistics = {
      "Урагус сибирский": 5,
      "Серый сорокопут": 2,
      "Рыжая вечерница": 0,
      "Горностай": 3,
      "Хохлатка полая": 1,
      "Белоспинный дятел": 4,
      "Обыкновенная кутора": 0,
      "Обыкновенный еж": 6,
      "Зимородок": 2,
      "Удод": 1,
      "Незабудка болотная": 8,
      "Филин": 1,
      "Лесной хорек": 0,
      "Лютик длиннолистный": 3
    }



  const PARK_COORDINATES = {
    "bottom_left": [55.736431, 37.331806],
    "top_right": [55.811328, 37.449476]
}
  const [stat, setStat] = useState<Object>({})

  useEffect(() => {

    instanceAxios.get('/api/v1/reports/park').then((data) => {
      setStat(data.data)
      console.log(data.data)
    })
  }, [])





  return (

    <>    
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

        <Rectangle
          geometry={[PARK_COORDINATES.bottom_left, PARK_COORDINATES.top_right]}
          options={{
            fillColor: "#ffff0022",
            strokeColor: "#3caa3c88",
            strokeWidth: 7,
          }}

          >
        </Rectangle>
        {/* <Placemark
          modules={["geoObject.addon.balloon"]}
          defaultGeometry={[55.75, 37.57]}
          properties={{
            balloonContentBody:
              "This is balloon loaded by the Yandex.Maps API module system",
          }}
        /> */}
      </Map>
    </YMaps>









    <div>
      

          {Object.entries(statistics).map(([name, count], index) => 
            <div key={index} className='flex flex-row justify-start w-full items-center gap-10 mb-2'>
              <div className='w-1/2 text-left'>{name}</div>
              <div className='w-1/2 text-right'>{count}</div>
            </div>
          )

          }

      </div>
    </>

  );
};

export default MapComponent;