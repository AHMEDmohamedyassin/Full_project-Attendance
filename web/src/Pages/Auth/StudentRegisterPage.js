import React from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link } from 'react-router-dom'

const StudentRegisterPage = () => {
    return (
        <div className='contain pt-10 pb-32'>

            <div className='mainFrom'>
                <InputComp value={'value'} title={'الاسم'}/>
                <InputComp value={'value'} title={'رقم الهاتف'}/>
                <InputComp value={'value'} title={'الكلية'}/>
                <InputComp value={'value'} title={'الفصل'}/>
                <InputComp value={'value'} title={'الرقم'}/>
                <InputComp value={'value'} title={'الكود'}/>
                <InputComp value={'value'} title={'البريد الإليكتروني'}/>
                <InputComp value={'value'} title={'كلمة الرور'}/>
                <InputComp value={'value'} title={'تأكيد كلمة المرور'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                <button className='mainButton'>إنشاء حساب</button>
                <Link className='button text-gray-500' to={'/auth/login'}>تسجيل الدخول ؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/instructor'}>إنشاء حساب محاضر ؟</Link>
            </div>
        </div>
      )
}

export default StudentRegisterPage