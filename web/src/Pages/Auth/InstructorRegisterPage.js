import React from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link } from 'react-router-dom'

const InstructorRegisterPage = () => {
  return (
    <div className='contain pt-10 pb-48'>
        <div className='mainFrom'>
            <InputComp value={'value'} title={'الاسم'}/>
            <InputComp value={'value'} title={'رقم الهاتف'}/>
            <InputComp value={'value'} title={'البريد الإليكتروني'}/>
            <InputComp value={'value'} title={'الكلية'}/>
        </div>
        
        <div className='w-full center flex-col gap-1'>
            <button className='mainButton'>إنشاء حساب</button>
            <Link className='button text-gray-500' to={'/auth/login'}>تسجيل الدخول ؟</Link>
            <Link className='button text-gray-500' to={'/auth/register/student'}>إنشاء حساب طالب ؟</Link>
        </div>
    </div>
  )
}

export default InstructorRegisterPage