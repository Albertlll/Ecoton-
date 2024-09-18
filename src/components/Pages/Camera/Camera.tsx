import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import takePhoto from "./TakePhoto.svg";

interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export default () => {
  const [imageIsInputed, setImageIsInputed] = useState<boolean>(false);
  const [dataUri, setDataUri] = useState('');
  const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    if (imageIsInputed) {
      setIsLoading(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGeolocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setIsLoading(false);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setIsLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setIsLoading(false);
      }
    }
  }, [imageIsInputed]);

  const handleCancel = () => {
    setImageIsInputed(false);
    setGeolocation(null);
    setDataUri('');
  };

  const handleConfirm = () => {
    // Here you would typically send the data to the server
    console.log("Sending data to server:", {
      image: dataUri,
      geolocation,
    });
    setImageIsInputed(false);
    setGeolocation(null);
    setDataUri('');
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
                {dataUri && (
                  <img src={dataUri} alt="Captured" className="w-full mb-4 rounded" />
                )}
    
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Отправка
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
