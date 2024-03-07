import React from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className='contain pt-10 pb-32'>

            <div className='mx-auto max-w-96 flex flex-col gap-y-4 my-10'>
                <InputComp value={'value'} title={'البريد الإليكتروني'}/>
                <InputComp value={'value'} title={'كلمة الرور'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                <button className='mainButton'>تسجيل الدخول</button>
                <Link className='button text-gray-500' to={'/auth/register/student'}>إنشاء حساب طالب ؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/instructor'}>إنشاء حساب محاضر ؟</Link>
            </div>
        </div>
      )
}

export default LoginPage