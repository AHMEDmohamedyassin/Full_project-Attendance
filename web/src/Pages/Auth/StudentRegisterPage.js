import React from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterAuth } from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../../Components/Public/LoaderComp'
import { notify } from '../../Components/Public/notification'

const StudentRegisterPage = () => {
    const state = useSelector(state => state.Auth)
    const dispatch = useDispatch()

    const submitHandle = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        let obj = {
            is_student : true
        }

        for (const pair of form.entries()) {
            obj[pair[0]] = pair[1]
        }

        dispatch(RegisterAuth(obj))
    }

    return (
        <form onSubmit={submitHandle} className='contain pt-10 pb-32'>

            <div className='mainFrom'>
                <InputComp name={'name'} title={'الاسم'}/>
                <InputComp name={'phone'} title={'رقم الهاتف'}/>
                <InputComp name={'collage_id'} title={'الكلية'}/>
                <InputComp name={'sec'} title={'الفصل'}/>
                <InputComp name={'bn'} title={'الرقم'}/>
                <InputComp name={'group'} title={'المجموعة'}/>
                <InputComp name={'code'} title={'الكود'}/>
                <InputComp name={'email'} title={'البريد الإليكتروني'}/>
                <InputComp name={'password'} title={'كلمة الرور'}/>
                <InputComp name={'password_confirmation'} title={'تأكيد كلمة المرور'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                {
                    state.status == 'rl' ? <span><SmallLoaderComp/></span> : 
                    <button className='mainButton'>إنشاء حساب</button>
                }
                <Link className='button text-gray-500' to={'/auth/login'}>تسجيل الدخول ؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/instructor'}>إنشاء حساب محاضر ؟</Link>
            </div>
        </form>
      )
}

export default StudentRegisterPage