import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import { useSelector } from 'react-redux'

const QrcodeComp = () => {
    const state = useSelector(state => state.Auth)
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
        <QRCode value={state?.id?.toString()} size={100} onClick={handleShowQr}/>
        {
          showQr ? (
            <div onClick={handleHideQr} className='fixed top-0 left-0 bg-white w-full h-full center'>
                <QRCode 
                    value={state?.id?.toString()}
                    className='w-full h-[95%]'
                />
            </div>
          ) : null
        }
    </div>
  )
}

export default QrcodeComp