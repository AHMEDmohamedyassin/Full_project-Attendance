import React from 'react'

const StudentCardComp = () => {
  return (
        <div className='w-full flex flex-col p-6 bg-mainWhite rounded-lg shadow-md shadow-mainShadow'>
            <div className='grid lg:grid-cols-5 sm:grid-cols-3 gap-4 border-b-[1px] border-slate-300 pb-4 mb-4'>
                {/* name */}
                <div className='lg:col-span-2 sm:col-span-3 flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='font-semibold hover:text-mainBlue button'>أحمد محمد</div>
                </div>
                {/* section */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>فصل : </div>
                    <div className='font-semibold hover:text-mainBlue button'>2</div>
                </div>
                {/* bench */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>رقم : </div>
                    <div className='font-semibold hover:text-mainBlue button'>4</div>
                </div>
                {/* code */}
                <div className='flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='text-gray-500'>كود : </div>
                    <div className='font-semibold hover:text-mainBlue button'>9210150</div>
                </div>
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
        </div>
  )
}

export default StudentCardComp