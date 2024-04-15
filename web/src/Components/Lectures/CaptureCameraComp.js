import React, { useEffect, useState } from 'react'
import QRCodeScannerComp from './QRCodeScannerComp'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitAttendanceLecture } from '../../redux/action/LectureAction'
import { SmallLoaderComp } from '../Public/LoaderComp'
import { notify } from '../Public/notification'

const CaptureCameraComp = ({openFunc}) => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()
    const [show , setShow] = useState(false)
    const [data , setData] = useState([])
    const [captureAnimate , setCaptureAnimate] = useState(false)

    // make array of ids
    const handleQrs = (qr) => {
        try{
            let obj = JSON.parse(qr)

            if(new Date(new Date().toUTCString()).getTime() - new Date(new Date(obj.created).toUTCString()).getTime() > 15000) 
                return animateCapture('done')  // expired  // time calculated in milliseconds

            let id = obj.id
            
            // check if id is repeated
            if(data.includes(id)) return animateCapture('repeated')   // repeated
            
            let newData = []
            setData(old => {
                newData = [...new Set([...old , id])]
                return newData
            })
    
            // handle animation
            animateCapture('done')
        }catch($e){
            animateCapture('done')  //error
        }
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
        if(state.status == 'ms' || state.status == 'al'){
            dispatch({type:"Lecture_Status" , data : "n"})
            setShow(false)
        }
    } , [state.status])

    // reset qrs
    useEffect(() => {
        setData([])
    } , [show])

    // capture animation 
    function animateCapture (state) {
        setCaptureAnimate(state)
        setTimeout(() => setCaptureAnimate(false) , 1000)
    }

    // handle open and close camera
    const handleOpen = () => {
        setShow(true)
        if(openFunc) openFunc(true)
    }
  return (
    <>
        {/* <div className='absolute top-0'>{JSON.stringify(data)}</div> */}
        <span onClick={handleOpen} className="material-symbols-outlined text-5xl text-gray-500 font-bold fill button">photo_camera</span>
        {
            show ? 
                <div className='w-full h-full fixed top-0 left-0 z-50 bg-black/20 center px-4'>
                    <div className='relative lg:w-2/4 w-full max-w-[600px] h-3/4 bg-mainWhite shadow-mainShadow rounded p-4'>
                        <div className='flex flex-row-reverse justify-between items-start flex-wrap'>
                            {/* close button */}
                            <span onClick={() => setShow(false)} className="material-symbols-outlined text-3xl shadow-gray-400 shadow-lg rounded hover:text-red-500 button">close</span>
                            {/* count */}
                            {
                                data.length > 0 ? (
                                    <div className='flex gap-x-4 bg-mainWhite px-2 py-1 shadow-lg shadow-gray-400 rounded-md text-lg font-bold'>
                                        <span className='text-md font-normal text-gray-500'>العدد : </span>
                                        <span>{data.length}</span>
                                    </div>
                                ) : null
                            }
                        </div>
                        

                        <div className='w-full h-3/4 mt-2 rounded-lg'>
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


                        {/* animation */}
                        {
                            captureAnimate == 'done' ? (
                                <div className='absolute top-[10%] w-full z-50 center captureAnimation'>
                                    <div className='bg-green-600 text-white rounded-full aspect-square w-12 center'>
                                        <span className="material-symbols-outlined text-4xl">check</span>
                                    </div>
                                </div>
                            )
                            : captureAnimate == 'repeated' ?
                                <div className='absolute top-[10%] w-full z-50 center captureAnimation'>
                                    <div className='bg-yellow-600 text-white rounded-full aspect-square w-12 center'>متكرر</div>
                                </div>
                            : captureAnimate == 'expired' ?    
                                <div className='absolute top-[10%] w-full z-50 center captureAnimation'>
                                    <div className='bg-red-600 text-white rounded-full aspect-square w-12 center'>منتهي</div>
                                </div>
                            : captureAnimate == 'error' ? 
                                <div className='absolute top-[10%] w-full z-50 center captureAnimation'>
                                    <div className='bg-red-600 text-white rounded-full aspect-square w-12 center'>
                                        <span className="material-symbols-outlined text-4xl">close</span>
                                    </div>
                                </div>
                            :null
                        }
                    </div>
                </div>
            :null
        }
    </>
  )
}

export default CaptureCameraComp