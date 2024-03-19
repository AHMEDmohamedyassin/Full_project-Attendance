import React , {useEffect} from 'react'
import QrcodeComp from '../../Components/Public/QrcodeComp'
import StudentCardComp from '../../Components/Lectures/StudentCardComp'
import { useLocation } from 'react-router-dom';
import { AttendanceLecture, ReadLecture } from '../../redux/action/LectureAction';
import { useDispatch, useSelector } from 'react-redux';
import { LargeLoaderComp, SmallLoaderComp } from '../../Components/Public/LoaderComp';

const DetailsPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const state = useSelector(state => state.Lecture)

    const LoadMore = () => {
        dispatch(AttendanceLecture({
            page : state.attendance.current + 1 ,
            id : state.lecture_data.id
        }))
    }

    useEffect(() => {
        const lect_id = location.pathname.split('/')[2]

        dispatch(ReadLecture(lect_id))
    } , [])
  return (
    
    <div className='contain'>
        <div className='font-bold lg:text-lg text-gray-500 my-4'>بيانات المحاضرة : [ {state.lecture_data?.title} ] </div>

        {/* qrcode part */}
        <div className='flex justify-center items-center flex-wrap gap-4'>
            <QrcodeComp/>
            <span className="material-symbols-outlined text-5xl text-gray-500 font-bold fill button">photo_camera</span>
        </div>

        {/* manual form part  */}
        <div className='w-fit flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 my-6 mx-auto bg-mainWhite rounded-lg shadow-lg shadow-mainShadow'>
            <label className='text-mainBlue'>كود الطالب : </label>
            <input className='mainInput bg-white' placeholder='كود الطالب' />
            <button className='mainButton'>تأكيد</button>
        </div>

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