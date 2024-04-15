import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CaptureCameraComp from '../Lectures/CaptureCameraComp'
import {AttPermissionAuth} from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../Public/LoaderComp'

const PermissionsComp = () => {
    const state = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const [show , setShow] = useState(false)

    const handleScan = (id) => {


        // handle_id of lecture in store to be read by CaptureCameraComp 
        dispatch({type : "Lecture_Data" , data : {lecture_data : {id}}})
    }

    const Reload = () => {
        dispatch(AttPermissionAuth())
    }
  return (
    <div>
        <span onClick={() => setShow(true)} className="material-symbols-outlined text-4xl button">fact_check</span>

        {
            show ? (
                <div className='w-full h-full fixed top-0 left-0 z-50 bg-black/20 center px-4'>
                    <div className='relative lg:w-2/4 w-full max-w-[600px] h-3/4 bg-mainWhite shadow-mainShadow rounded p-4'>
                        <div className='h-full flex flex-col'>
                            <span onClick={() => setShow(false)} className="material-symbols-outlined text-3xl shadow-gray-400 shadow-lg rounded hover:text-red-500 button w-fit self-end">close</span>

                            {/* refresh permissions */}
                            <div onClick={Reload} className='w-full center'>
                                {
                                    state.status == 'apl' ? <SmallLoaderComp/> :
                                        <span className="material-symbols-outlined text-4xl button">refresh</span>
                                }
                            </div>

                            <div className='w-full overflow-auto flex flex-col gap-y-4 mt-10 py-4'>
                                {
                                    state.permissions?.length ? (<>
                                        {
                                            state.permissions.map((e , key) => (<>
                                                <div key={key} className='w-full flex justify-between items-center bg-mainWhite rounded p-2 shadow-gray-400 shadow border-gray-300 border-[1px]'>
                                                    <div>{e.lecture?.title}</div>
                                                    <CaptureCameraComp openFunc={() => handleScan(e.lecture_id)}/>
                                                </div>
                                            </>))
                                        }
                                    </>) : <div className='w-full text-center text-red-600'>لا يوجد لديك صلاحيات</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default PermissionsComp