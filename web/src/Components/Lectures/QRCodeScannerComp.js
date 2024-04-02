import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

const QRCodeScannerComp = (props) => {
  const [camera , setCamera] = useState(false)

  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      props.onResult(decodedText);
    //   handleStop();
    };
    html5QrCode.start(
      { facingMode: "environment" },
      qrConfig ,
      qrCodeSuccessCallback
    );

    setCamera(true)
  };

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
    
    setCamera(false)
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="reader" width="100%" />
      
      <div className="center w-full my-10 gap-4">
        {
          camera ? (
            <>
              <button className="bg-red-600 text-xl text-white p-2 rounded-lg hover:bg-red-600/80" onClick={() => handleStop()}>
                  <span className="material-symbols-outlined text-2x lg:text-4xl">no_photography</span>
              </button>
            </>
          ) : (
            <>
              <button className="bg-mainBlue text-xl text-white p-2 rounded-lg hover:bg-mainBlue/80" onClick={() => handleClickAdvanced()}>
                  <span className="material-symbols-outlined text-2x lg:text-4xl">photo_camera</span>
              </button>
            </>
          ) 
        }
        
      </div>
    </div>
  );
};
export default QRCodeScannerComp;
