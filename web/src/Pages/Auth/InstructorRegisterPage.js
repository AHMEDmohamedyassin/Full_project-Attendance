import React from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterAuth } from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../../Components/Public/LoaderComp'

const InstructorRegisterPage = () => {
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandle = (e) => {
      e.preventDefault()
      const form = new FormData(e.target)
      let obj = {
          is_student : false
      }

      for (const pair of form.entries()) {
          obj[pair[0]] = pair[1]
      }

      dispatch(RegisterAuth(obj))

      navigate('/')
  }

  return (
    <form onSubmit={submitHandle} className='contain pt-10 pb-48'>
        <div className='mainFrom'>
            <InputComp required={true} name={'name'} title={'الاسم'}/>
            <InputComp required={true} name={'phone'} title={'رقم الهاتف'}/>
            <InputComp required={true} name={'email'} title={'البريد الإليكتروني'}/>
            <InputComp required={true} name={'collage_id'} title={'الكلية'}/>
            <InputComp required={true} type={'password'} name={'password'} title={'كلمة المرور'}/>
            <InputComp required={true} type={'password'} name={'password_confirmation'} title={'تأكيد كلمة المرور'}/>
        </div>
        
        <div className='w-full center flex-col gap-1'>
            {
                state.status == 'rl' ? <span><SmallLoaderComp/></span> : 
                <button className='mainButton'>إنشاء حساب</button>
            }
            <Link className='button text-gray-500' to={'/auth/login'}>تسجيل الدخول ؟</Link>
            <Link className='button text-gray-500' to={'/auth/register/student'}>إنشاء حساب طالب ؟</Link>
        </div>
    </form>
  )
}

export default InstructorRegisterPage