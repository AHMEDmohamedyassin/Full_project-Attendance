import React, { useEffect, useState } from 'react'
import QRCodeScannerComp from './QRCodeScannerComp'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitAttendanceLecture } from '../../redux/action/LectureAction'
import { SmallLoaderComp } from '../Public/LoaderComp'
import { notify } from '../Public/notification'

const CaptureCameraComp = () => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()
    const [show , setShow] = useState(false)
    const [data , setData] = useState([])
    const [captureAnimate , setCaptureAnimate] = useState(false)

    // make array of ids
    const handleQrs = (qr) => {
        let newData = []

        setData(old => {
            newData = [...new Set([...old , qr])]
            return newData
        })

        // handle animation
        if(data.length === newData.length) animateCapture('repeated')
        else animateCapture()
    }

    // submit qrcodes
    const submitQr = () => {
        dispatch(SubmitAttendanceLecture({
            users_id : data,                      // need to be changed : new Set(data)
            id : state.lecture_data.id
        }))
    }

    // showing error if students not submitted and clear data list from qrs if success submitting
    useEffect(() => {
        if(state.status == 'mf'){
            dispatch({type:"Lecture_Status" , data : "n"})
        }
        if(state.status == 'ms'){
            dispatch({type:"Lecture_Status" , data : "n"})
        }
    } , [state.status])

    // reset qrs
    useEffect(() => {
        setData([])
    } , [show])

    // capture animation 
    const animateCapture = (state = 'done') => {
        setCaptureAnimate(state)
        setTimeout(() => setCaptureAnimate(false) , 1000)
    }
  return (
    <>
        <div className='absolute top-0'>{JSON.stringify(data)}</div>
        <span onClick={() => setShow(true)} className="material-symbols-outlined text-5xl text-gray-500 font-bold fill button">photo_camera</span>
        {
            show ? 
                <div className='w-full h-full fixed top-0 left-0 z-40 bg-black/20 center px-4'>
                    <div className='relative lg:w-2/4 w-full max-w-[600px] h-3/4 bg-mainWhite shadow-mainShadow rounded p-4'>
                        <span onClick={() => setShow(false)} className="material-symbols-outlined text-3xl shadow-gray-400 shadow-lg rounded hover:text-red-500 button">close</span>
                        
                        {
                            captureAnimate ? 
                                <div className='absolute top-[10%] w-full z-50 center captureAnimation'>
                                    {
                                        captureAnimate == 'done' ? 
                                            <div className='bg-green-600 text-white rounded-full aspect-square w-12 center'>
                                                <span class="material-symbols-outlined text-4xl">check</span>
                                            </div>
                                        :
                                            <div className='bg-red-600 text-white rounded-full aspect-square w-12 center'>مكرر</div>
                                    }
                                </div>
                             : null
                        }

                        <div className='w-full h-3/4'>
                            <QRCodeScannerComp onResult={handleQrs} />
                        </div>

                        {
                            data.length > 0 ? 
                                <div className='center'>
                                    {
                                        state.status == 'ml' ?
                                            <SmallLoaderComp/>
                                        :
                                            <button onClick={submitQr} className='mainButton'>تأكيد</button>
                                    }
                                </div>
                            : null
                        }
                    </div>
                </div>
            :null
        }
    </>
  )
}

export default CaptureCameraComp