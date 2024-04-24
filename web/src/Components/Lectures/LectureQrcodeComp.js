import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { useDispatch, useSelector } from 'react-redux'
import { QRActivateLecture } from '../../redux/action/LectureAction'

const QrcodeComp = () => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()
    const [showQr , setShowQr]= useState(false)
    const [qrValue , setQrValue] = useState('')
    const [count , setCount] = useState(0)
    const delayInterval = 3000

    /**
     * showing and hide qrcode
     */

    // showing qrcode function , update capture end date
    const handleShowQr = () => {
      dispatch(QRActivateLecture(state.lecture_data.id))
    }

    // showing qrcode when updating capture end date done
    useEffect(() => {
      if(state.status !== 'qs') return 

      openFullscreen()
      setShowQr(true)
      dispatch({type:"Lecture_Status" , data : "n"})

    } , [state.status])

    // hidding qrcode function
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

      // formatting the qrcode content
      const formateQrData = (id , end = false) => {
        return JSON.stringify({
          lect_id : state.lecture_data.id ,
          id ,
          end
        })
      }

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
            setQrValue(formateQrData(ids[count]))
          else if (count === ids.length){
            setQrValue(formateQrData(end , true))  
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
    <div className='flex justify-center z-40'>
        <QRCode value={`${state.lecture_data?.title}`} size={100} onClick={handleShowQr}/>
        {
          showQr ? (
            <div onClick={handleHideQr} className='fixed top-0 left-0 bg-white w-full h-full center'>
                <QRCode 
                    value={qrValue}
                    className='w-full h-[95%]'
                />
            </div>
          ) : null
        }
    </div>
  )
}

export default QrcodeComp