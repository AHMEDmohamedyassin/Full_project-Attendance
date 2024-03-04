import React, { useState } from 'react'
import QRCode from 'react-qr-code'

const QrcodeComp = () => {
    const [showQr , setShowQr]= useState(false)

    const handleShowQr = () => {
        openFullscreen()
        setShowQr(true)
    }

    const handleHideQr = () => {
        exitFullscreen()
        setShowQr(false)
    }

    const openFullscreen = () => {
        if(!!document.fullscreenElement) return

        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
      };

      const exitFullscreen = () => {
        if(!(!!document.fullscreenElement)) return

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      };

  return (
    <div className='flex justify-center'>
        <QRCode value='ahmed' size={100} onClick={handleShowQr}/>
        <div onClick={handleHideQr} style={{display : showQr ? 'block' : 'none'}} className='fixed top-0 left-0 bg-white w-full h-full flex justify-center'>
            <QRCode 
                value='ahmed'
                className='w-full h-full'
            />
        </div>
    </div>
  )
}

export default QrcodeComp