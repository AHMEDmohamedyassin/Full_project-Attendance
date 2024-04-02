import React, { useEffect } from 'react'
import LectureCardComp from '../../Components/Attendance/LectureCardComp'
import { useDispatch, useSelector } from 'react-redux'
import { AttendanceStudent } from '../../redux/action/StudentAction'
import {SmallLoaderComp} from '../../Components/Public/LoaderComp'

const LecturesPage = () => {
  const state = useSelector(state => state.Stud)
  const dispatch = useDispatch()

  const LoadMore = () => {
    dispatch(AttendanceStudent({
      page : state.current + 1
    }))
  }

  useEffect(() => {
    if(!state?.items?.length)
      dispatch(AttendanceStudent())
  } , [])
  return (
    <div className='contain'>
        <div className='mainListing'>
            {
                state.items.map((e , index) => (
                    <LectureCardComp key={index} {...e}/>
                ))
            }
        </div>
        <div className='w-full center my-10'>
          {
            state.status === "al" ? <SmallLoaderComp/> : 
              <button disabled={!state.hasMore} onClick={LoadMore} className={`mainButton disabled:bg-gray-500/50 hover:bg-mainBlue/80 disabled:cursor-not-allowed`}>تحميل المزيد</button>
          }
        </div>
    </div>
  )
}

export default LecturesPage