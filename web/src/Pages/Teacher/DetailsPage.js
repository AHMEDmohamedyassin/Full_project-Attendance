import React from 'react'
import QrcodeComp from '../../Components/Public/QrcodeComp'
import PageTitle from '../../Components/Public/PageTitle'
import StudentCardComp from '../../Components/Lectures/StudentCardComp'

const DetailsPage = () => {
  return (
    <div className='contain'>
        <div className='flex justify-center items-center flex-wrap gap-4'>
            <QrcodeComp/>
            <span className="material-symbols-outlined text-5xl text-gray-500 font-bold fill button">photo_camera</span>
        </div>

        <div className='w-fit flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 my-6 mx-auto bg-mainWhite rounded-lg shadow-lg shadow-mainShadow'>
            <label className='text-mainBlue'>كود الطالب : </label>
            <input className='mainInput bg-white' placeholder='كود الطالب' />
            <button className='mainButton'>تأكيد</button>
        </div>

        <div className='font-bold text-lg text-gray-500 mt-12 border-t-[1px] border-gray-300 py-6'>الطلاب المسجلين : </div>
        
        <div className='mainListing'>
            {
                Array(10).fill(0).map((e , index) => (
                    <StudentCardComp key={index}/>
                ))
            }
        </div>

    </div>
  )
}

export default DetailsPage