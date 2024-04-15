import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { useSelector } from 'react-redux'

const QrcodeComp = () => {
    const state = useSelector(state => state.Auth)
    const [showQr , setShowQr]= useState(false)
    const [qrTime , setQrTime] = useState(0)

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

      useEffect(() => {
        setQrTime(old => (new Date).getTime())
        const interval = setInterval(() => {
          setQrTime(old => new Date(new Date().toUTCString()).getTime() )
        } , 5000)

        return () => clearInterval(interval)
      } , [])
  return (
    <div className='flex justify-center'>
        <QRCode value={JSON.stringify({id:state?.id , created:qrTime})} size={100} onClick={handleShowQr}/>
        {
          showQr ? (
            <div onClick={handleHideQr} className='z-50 fixed top-0 left-0 bg-white w-full h-full center'>
                <QRCode 
                    value={JSON.stringify({id:state?.id , created:qrTime})}
                    className='w-full h-[95%]'
                />
            </div>
          ) : null
        }
    </div>
  )
}

export default QrcodeComp