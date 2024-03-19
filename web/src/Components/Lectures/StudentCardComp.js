import React from 'react'

const StudentCardComp = ({name , json_data , pivot}) => {
    const {bn,sec,code,group} = JSON.parse(json_data) 
    const date = new Date(pivot?.created_at)
  return (
        <div className='w-full flex flex-col p-6 bg-mainWhite rounded-lg shadow-md shadow-mainShadow'>
            <div className='grid lg:grid-cols-6 sm:grid-cols-4 gap-4 border-b-[1px] border-slate-300 pb-4 mb-4'>
                {/* name */}
                <div className='lg:col-span-2 sm:col-span-4 flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='font-semibold hover:text-mainBlue button'>{name}</div>
                </div>
                {/* section */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>فصل : </div>
                    <div className='font-semibold hover:text-mainBlue button'>{sec}</div>
                </div>
                {/* bench */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>رقم : </div>
                    <div className='font-semibold hover:text-mainBlue button'>{bn}</div>
                </div>
                {/* code */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>كود : </div>
                    <div className='font-semibold hover:text-mainBlue button'>{code}</div>
                </div>
                {/* group */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>المجموعة : </div>
                    <div className='font-semibold hover:text-mainBlue button'>{group}</div>
                </div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-2 text-gray-600'>
                <div className='flex items-center  gap-2'>
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>{date.getFullYear()} / {date.getMonth() +1} / {date.getDate()}</span>
                </div>
                <div className='flex items-center  gap-2'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span className=''>{date.getMinutes()} : {date.getHours()}</span>
                </div>
            </div>
        </div>
  )
}

export default StudentCardComp