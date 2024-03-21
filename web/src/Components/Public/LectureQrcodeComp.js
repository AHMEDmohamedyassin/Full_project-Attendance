import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { useSelector } from 'react-redux'

const QrcodeComp = () => {
    const state = useSelector(state => state.Lecture)
    const [showQr , setShowQr]= useState(false)
    const [qrValue , setQrValue] = useState('')
    const [count , setCount] = useState(0)
    const delayInterval = 3000

    // show and hide qr
    const handleShowQr = () => {
        openFullscreen()
        setShowQr(true)
    }

    const handleHideQr = () => {
        exitFullscreen()
        setShowQr(false)
    }

    // open full screen
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

      // exit full screen
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

      // making intervals count
      useEffect(() => {
        const interval = setInterval(() => {
          setCount(prevCount => {
            let qr_ids = state.lecture_data?.qr_ids?.ids
            if(qr_ids && prevCount >= qr_ids.length){
              return 0
            }
            return prevCount + 1
          });
        }, delayInterval);
    
        return () => clearInterval(interval);
      }, []);

      // changing qr values
      useEffect(() => {
        const qr = state.lecture_data?.qr_ids
        let ids = qr?.ids
        const end = qr?.end

        if(showQr && qr && ids && end){
          if(count < ids.length)
            setQrValue(ids[count])
          else if (count === ids.length){
            setQrValue(end)  
            const interval = setTimeout(() => {
              exitFullscreen()
              setShowQr(false)
            }  , delayInterval)
          }
        }
      } , [state , showQr , count])

      // initialize count to zero on opening the full screen qrcode
      useEffect(() => {
        if(showQr) setCount(0)
      } , [showQr])

  return (
    <div className='flex justify-center'>
        <QRCode value={`${state.lecture_data?.title}`} size={100} onClick={handleShowQr}/>
        {
          showQr ? (
            <div onClick={handleHideQr} className='fixed top-0 left-0 bg-white w-full h-full flex justify-center'>
                <QRCode 
                    value={qrValue}
                    className='w-full h-full'
                />
            </div>
          ) : null
        }
    </div>
  )
}

export default QrcodeComp