import React from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {SmallLoaderComp} from '../../Components/Public/LoaderComp'
import { LoginAuth } from '../../redux/action/AuthAction'

const LoginPage = () => {
    const state = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandle = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        let obj = {}

        for(const pair of form.entries())
            obj[pair[0]] = pair[1]

        dispatch(LoginAuth(obj))
        
        // navigate('/')
    }

    return (
        <form onSubmit={submitHandle} className='contain pt-10 pb-32'>

            <div className='mx-auto max-w-96 flex flex-col gap-y-4 my-10'>
                <InputComp name={'email'} title={'البريد الإليكتروني'} required={true}/>
                <InputComp name={'password'} title={'كلمة الرور'} required={true} type={'password'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                {
                    state.status == 'll' ? <SmallLoaderComp/> : 
                        <button className='mainButton'>تسجيل الدخول</button>
                }
                <Link className='button text-gray-500' to={'/auth/forgetpassword'}>نسيت كلمة المرور؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/student'}>إنشاء حساب طالب ؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/instructor'}>إنشاء حساب محاضر ؟</Link>
            </div>
        </form>
      )
}

export default LoginPage