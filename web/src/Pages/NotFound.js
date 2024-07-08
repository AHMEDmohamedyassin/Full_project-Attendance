import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='contain center flex-col py-10 gap-y-4'>
        <div className='text-red-500 lg:text-2xl'>الصفحة غير موجودة</div>
        <span className="material-symbols-outlined text-[300px] lg:text-[400px] text-gray-400/20">sentiment_sad</span>    
        <Link className='mainButton' to={'/'}>الذهاب للصفحة الرئيسية</Link>
    </div>
  )
}

export default NotFound