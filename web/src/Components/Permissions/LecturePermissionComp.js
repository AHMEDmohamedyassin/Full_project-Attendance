import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CaptureCameraComp from '../Lectures/CaptureCameraComp'
import {AttPermissionAuth} from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../Public/LoaderComp'
import { CreateLectPermissionLecture, DeleteLectPermissionLecture, ListLectPermissionLecture } from '../../redux/action/PermissionAttendanceAction'
import InputComp from '../Form/InputComp'

const LecturePermissionComp = () => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()
    const [show , setShow] = useState(false)

    //create permission
    const handleCreatePermission = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const stud_id = form.get("id")
        const expire_minutes = form.get('min')

        dispatch(CreateLectPermissionLecture({stud_id , expire_minutes}))
    }

    // delete permission
    const handleDeletePermission = (id) => {
        dispatch(DeleteLectPermissionLecture(id))
    }

    useEffect(() => {
        if(state.lecture_data?.id)
            dispatch(ListLectPermissionLecture(state.lecture_data?.id))
    } , [state.lecture_data])
  return (
    <div>
        <span onClick={() => setShow(true)} className="material-symbols-outlined text-4xl button">fact_check</span>

        {
            show ? (
                <div className='w-full h-full fixed top-0 left-0 z-50 bg-black/20 center px-4'>
                    <div className='relative lg:w-2/4 w-full max-w-[600px] h-3/4 bg-mainWhite shadow-mainShadow rounded p-4'>
                        <div className='h-full flex flex-col'>
                            <span onClick={() => setShow(false)} className="material-symbols-outlined text-3xl shadow-gray-400 shadow-lg rounded hover:text-red-500 button w-fit self-end">close</span>

                            {/* create permission from */}
                            <form onSubmit={handleCreatePermission} className='flex flex-wrap gap-1'>
                                <InputComp name={'id'} title={'إضافة صلاحية لمستخدم'} placeholder={'كود المستخدم'}/>
                                <InputComp name={'min'} type={'number'} placeholder={'عدد دقائق الافتراضي إتاحة الصلاحية : 5 دقائق '}  />
                                <div className='w-fit mt-3'>
                                    {
                                        state.status == 'cpl' ? <SmallLoaderComp/> :
                                            <button className='mainButton'>تأكيد</button>
                                    }
                                </div>
                            </form>

                            {/* available pemissions */}
                            <div className='w-full overflow-auto flex flex-col gap-y-4 mt-4 py-4'>
                                {
                                    state.lecture_permission?.length ? (<>
                                        <div className='text-gray-500 w-full border-t-[2px] border-t-gray-300 pt-4 font-semibold'>الصلاحيات : [{state.lecture_permission.length}] </div>
                                        {
                                            state.lecture_permission.map((e , key) => (<>
                                                <div key={key} className='w-full flex justify-between items-center bg-mainWhite rounded p-2 shadow-gray-400 shadow border-gray-300 border-[1px] border-r-[2px] border-r-mainBlue'>
                                                    <div>{e.user.name}</div>
                                                    <div className='h-10 center'>
                                                        {
                                                            state.status == `d${e.id}pl` ? <SmallLoaderComp/> : 
                                                                <span onClick={() => handleDeletePermission(e.id)} className="material-symbols-outlined text-red-600 hover:text-red-600/60 lg:text-3xl text-2xl button">delete</span>
                                                        }
                                                    </div>
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