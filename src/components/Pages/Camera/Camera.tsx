import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import takePhoto from "./TakePhoto.svg";
import {instanceAxios} from "../../../../httpConfig.ts"
interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export default () => {
  const [imageIsInputed, setImageIsInputed] = useState<boolean>(false);
  const [dataUri, setDataUri] = useState('');
  const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(null);
  const [dataLoaded, setDataLoaded] = useState<string | null>(null);

  const [geoDisabled, setGeoDisabled] = useState<boolean>(true)
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "environment"
  };

  const capture = useCallback(() => {
    if (webcamRef.current == null) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setDataUri(imageSrc || '');
    setImageIsInputed(true);
  }, [webcamRef]);


  const getGeoPermissions = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setGeoDisabled(false)

        },
        (error) => {
          setGeoDisabled(true)
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    if (imageIsInputed) {
    }

    getGeoPermissions();
  }, [imageIsInputed]);

  const handleCancel = () => {
    setImageIsInputed(false);
    setGeoDisabled(true);
    setGeolocation(null);
    setDataLoaded(null);
    setDataUri('');
  };


  const handleJustSender = () => {

    setDataLoaded("(здесь нейросеть выдает что обнаружила на фотографии)");



  }





  






  const handleConfirm = () => {
    // Here you would typically send the data to the server

    // if (geolocation == null) {
    //   getGeoPermissions()
    //   return;
    // }



    console.log("Sending data to server:", {
      image: dataUri,
      geolocation,
    });


    // 55.777777
    // 37.374444

    if (geolocation)  {

      instanceAxios.post("/api/v1/submissions", {
        image : dataUri,
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude,
        
      }).then(
        async (data) => {
  
          setDataLoaded(data.data.object_class);
          
        }
      )

    }
    else{
      instanceAxios.post("/api/v1/submissions", {
        image : dataUri,
        latitude: 55.777777,
        longitude: 37.374444,
        
      }).then(
        async (data) => {
  
          setDataLoaded(data.data.object_class);
          
        }
      )
    }




    // setImageIsInputed(false);
    setGeolocation(null);
  };

  return (
    <>
      <div className="h-full flex-col w-full flex items-center justify-center">
        <div className="rounded-xl overflow-hidden m-10">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />    
        </div>

        <button className="w-10 t-10" onClick={capture}>
          <img src={takePhoto} alt="" />
        </button>
      </div>

      <AnimatePresence>
        {imageIsInputed && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50"
            />
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl mb-4">Подтверждение фотографии</h2>
                <div className="relative w-full h-auto">

                <h2 className="absolute -translate-x-[50%] -translate-y-[125%] mt-[50%] ml-[50%]">
                  {dataLoaded}
                </h2>

                {dataUri && (
                  <motion.img initial="visible" animate={dataLoaded == null ? "visible" : "hidden"} variants={{visible: { opacity: 1 }, hidden: { opacity: 0 }}} src={dataUri} alt="Captured" className=" w-full mb-4 rounded" />
                )}




                </div>
     
    
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                  >
                    Отмена
                  </button>

                  <button
                    onClick={handleJustSender}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Отправка
                  </button>
                </div>

                <div className=" text-[12px] text-right">Внимание! Для отправки необходимо разрешения использования геопозии</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
