import React , {useEffect, useState} from 'react'
import LectureQrcodeComp from '../../Components/Lectures/LectureQrcodeComp'
import StudentCardComp from '../../Components/Lectures/StudentCardComp'
import { useLocation, useNavigate } from 'react-router-dom';
import { AttendanceLecture, DeleteLecture, ReadLecture, SubmitAttendanceLecture } from '../../redux/action/LectureAction';
import { useDispatch, useSelector } from 'react-redux';
import { LargeLoaderComp, SmallLoaderComp } from '../../Components/Public/LoaderComp';
import CaptureCameraComp from '../../Components/Lectures/CaptureCameraComp';
import { notify } from '../../Components/Public/notification';
import ExcelSheetComp from '../../Components/Lectures/ExcelSheetComp';

const DetailsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state.Lecture)
    const [lect_id , setLect_id ] = useState(0)

    // load more students in attendance
    const LoadMore = () => {
        dispatch(AttendanceLecture({
            page : state.attendance.current + 1 ,
            id : state.lecture_data.id
        }))
    }

    // submit manual id attendance
    const AttendanceHandle = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const id = form.get("id")
        
        dispatch(SubmitAttendanceLecture({
            users_id : [id],
            id : lect_id
        }))
    }

    // showing error if student not submitted
    useEffect(() => {
        if(state.status == 'mf' || state.status == 'ms')
            dispatch({type:"Lecture_Status" , data : "n"})
    } , [state.status])

    // delete lecture 
    const deleteLecture = () => {
        dispatch(DeleteLecture({
            lecture_id : lect_id
        }))
        navigate('/lectures/instructor')
    }

    // initiat the page
    useEffect(() => {
        const lect_id = location.pathname.split('/')[2]
        setLect_id(lect_id)

        dispatch(ReadLecture(lect_id))
    } , [])

  return (
    
    <div className='contain'>
        <div className='flex justify-between items-center'>
            <div className='font-bold lg:text-lg text-gray-500 my-4'>بيانات المحاضرة : [ {state.lecture_data?.title} ] </div>
            {
                state.status == 'dl' ? <SmallLoaderComp/> :
                    <span onClick={deleteLecture} className="material-symbols-outlined text-gray-500 hover:text-red-500 hover:cursor-pointer text-4xl" title='حذف المحاضرة'>delete</span>
            }
        </div>

        {/* qrcode part */}
        <div className='flex justify-center items-center flex-wrap gap-4'>
            <LectureQrcodeComp/>
            <CaptureCameraComp />
        </div>

        {/* manual form part  */}
        <form onSubmit={AttendanceHandle} className='w-fit flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 my-6 mx-auto bg-mainWhite rounded-lg shadow-lg shadow-mainShadow'>
            {
                state.status == 'ml' ? <SmallLoaderComp/> :
                (
                    <>
                        <label className='text-mainBlue'>كود الطالب : </label>
                        <input name='id' className='mainInput bg-white' placeholder='كود الطالب' />
                        <button className='mainButton'>تأكيد</button>
                    </>
                )
            }
        </form>

        <ExcelSheetComp/>

        {/* recorded students  */}
        <div className='font-bold text-lg text-gray-500 mt-12 border-t-[1px] border-gray-300 py-6'>الطلاب المسجلين : {state.attendance?.total}</div>
        
        {
            state.attendance ? (
                <>
                    <div className='mainListing'>
                        {
                            state.attendance.items.map((e , index) => (
                                <StudentCardComp key={index} {...e} />
                            ))
                        }
                    </div>

                    <div className='w-full center my-10'>
                        {
                            state.status === "rl" || state.status === "al" ? <SmallLoaderComp/> : 
                                <button disabled={!state.attendance.hasMore} onClick={LoadMore} className={`mainButton ${!state.attendance.hasMore?'bg-gray-500/50 hover:bg-gray-500/50 hover:cursor-not-allowed' : ''}`}>تحميل المزيد</button>
                        }
                    </div>
                </>
            ) : <div className='w-full center'><LargeLoaderComp/></div>
        }

    </div>
  )
}

export default DetailsPage