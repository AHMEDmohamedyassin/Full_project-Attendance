import React from 'react'
import { Link } from 'react-router-dom'

const LectureCardComp = ({title , created_at , id}) => {
    const date = new Date(created_at)
  return (
        <Link to={`/details/${id}`} className='w-full flex flex-col p-6 bg-mainWhite rounded-lg shadow-md shadow-mainShadow'>
            <div className='flex items-center gap-2 border-b-[1px] border-slate-300 pb-4 mb-4'>
                <div className='w-[2px] h-5 bg-mainBlue '></div>
                <div className='font-semibold hover:text-mainBlue button'>{title}</div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-2 text-gray-600'>
                <div className='flex items-center  gap-2'>
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>{date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}</span>
                </div>
                <div className='flex items-center  gap-2'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span className=''>{date.getMinutes()} : {date.getHours()}</span>
                </div>
            </div>
        </Link>
  )
}

export default LectureCardComp