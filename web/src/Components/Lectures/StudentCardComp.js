import React, { useEffect, useState } from 'react'

const StudentCardComp = ({name , json_data , pivot}) => {
    const {bn,sec,code,group} = json_data ? JSON.parse(json_data) : {} 
    const [date , setDate] = useState({})
    useEffect(() => {
        if(!pivot.created_at) return 
        const date = new Date(pivot.created_at)
        let hour = date.getHours()
        let PmAm = 'PM'
        let data = {
            minute : String(date.getMinutes()).padStart(2 , '0') ,
            day : String(date.getDate()).padStart(2,'0') ,
            month : String(date.getMonth() + 1).padStart(2,'0') ,
            year : date.getFullYear() ,
        }
        if(hour < 12) PmAm = 'AM'
        if(hour > 12) hour = hour - 12
        setDate({hour : String(hour).padStart(2 , '0') , PmAm , ...data})
    }  , [pivot.created_at])
    
  return (
        <div className='w-full flex flex-col px-6 pt-4 bg-mainWhite rounded-lg shadow-md shadow-mainShadow'>
            <div className='grid lg:grid-cols-6 sm:grid-cols-4 gap-4 pb-4'>
                {/* name */}
                <div className='lg:col-span-2 sm:col-span-4 flex items-center gap-2'>
                    <div className='w-[2px] h-5 bg-mainBlue '></div>
                    <div className='font-semibold hover:text-mainBlue button'>{name}</div>
                </div>
                
                {/* section */}
                {
                    sec ? 
                        <div className='flex items-center gap-2'>
                            <div className='w-[2px] h-5 bg-mainBlue '></div>
                            <div className='text-gray-500'>فصل : </div>
                            <div className='font-semibold hover:text-mainBlue button'>{sec}</div>
                        </div>
                    :null
                }

                {/* bench */}
                {
                    bn ? 
                        <div className='flex items-center gap-2'>
                            <div className='w-[2px] h-5 bg-mainBlue '></div>
                            <div className='text-gray-500'>رقم : </div>
                            <div className='font-semibold hover:text-mainBlue button'>{bn}</div>
                        </div>
                    :null
                }

                {/* code */}
                {
                    code ? 
                        <div className='flex items-center gap-2'>
                            <div className='w-[2px] h-5 bg-mainBlue '></div>
                            <div className='text-gray-500'>كود : </div>
                            <div className='font-semibold hover:text-mainBlue button'>{code}</div>
                        </div>
                    :null
                }

                {/* group */}
                {
                    group?
                        <div className='flex items-center gap-2'>
                            <div className='w-[2px] h-5 bg-mainBlue '></div>
                            <div className='text-gray-500'>المجموعة : </div>
                            <div className='font-semibold hover:text-mainBlue button'>{group}</div>
                        </div>
                    :null
                }

            </div>

            {
                Object.keys(date).length ? 
                <div className='flex flex-wrap items-center justify-between gap-2 text-gray-600 py-4 mt-1 border-t-[1px] border-slate-300'>
                    <div className='flex items-center  gap-2'>
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span>{date.day} / {date.month} / {date.year}</span>
                    </div>
                    <div className='flex items-center  gap-2'>
                        <span className="material-symbols-outlined">schedule</span>
                        <span>{date.PmAm}</span>
                        <span>{date.minute}</span> 
                        <span>:</span>  
                        <span>{date.hour}</span>  
                    </div>
                </div>
                :null
            }
        </div>
  )
}

export default StudentCardComp