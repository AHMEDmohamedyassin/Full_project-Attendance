import React from 'react'
import { Link } from 'react-router-dom'

const LectureCardComp = () => {
  return (
        <Link to={'/details'} className='w-full flex flex-col p-6 bg-mainWhite rounded-lg shadow-md shadow-mainShadow'>
            <div className='flex items-center gap-2 border-b-[1px] border-slate-300 pb-4 mb-4'>
                <div className='w-[2px] h-5 bg-mainBlue '></div>
                <div className='font-semibold hover:text-mainBlue button'>محاضرة تحليل المنشآت</div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-2 text-gray-600'>
                <div className='flex items-center  gap-2'>
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>23 / 2 / 2024</span>
                </div>
                <div className='flex items-center  gap-2'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span className=''>12 : 23</span>
                </div>
            </div>
        </Link>
  )
}

export default LectureCardComp