import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CaptureCameraComp from '../Lectures/CaptureCameraComp'
import {AttPermissionAuth} from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../Public/LoaderComp'

const LecturePermissionComp = () => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()
    const [show , setShow] = useState(false)

  return (
    <div>
        <span onClick={() => setShow(true)} className="material-symbols-outlined text-4xl button">fact_check</span>

        {
            show ? (
                <div className='w-full h-full fixed top-0 left-0 z-50 bg-black/20 center px-4'>
                    <div className='relative lg:w-2/4 w-full max-w-[600px] h-3/4 bg-mainWhite shadow-mainShadow rounded p-4'>
                        <div className='h-full flex flex-col'>
                            <span onClick={() => setShow(false)} className="material-symbols-outlined text-3xl shadow-gray-400 shadow-lg rounded hover:text-red-500 button w-fit self-end">close</span>


                            <div className='w-full overflow-auto flex flex-col gap-y-4 mt-10 py-4'>
                                {
                                    state.lecture_permission?.length ? (<>
                                        {
                                            state.lecture_permission.map((e , key) => (<>
                                                <div key={key} className='w-full flex justify-between items-center bg-mainWhite rounded p-2 shadow-gray-400 shadow border-gray-300 border-[1px]'>
                                                    <div>title</div>
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

export default LecturePermissionComp