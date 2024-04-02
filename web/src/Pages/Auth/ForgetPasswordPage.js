import React, { useEffect, useState } from 'react'
import InputComp from '../../Components/Form/InputComp'
import {SmallLoaderComp} from '../../Components/Public/LoaderComp'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ForgetPassowrdAuth } from '../../redux/action/AuthAction'

const ForgetPasswordPage = () => {
    const state = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const [counter , setCounter] = useState(0)

    const submitHandle = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')

        dispatch(ForgetPassowrdAuth(email))
    }

    // counter
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => prev - 1)
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    // showing counter
    useEffect(() => {
        if(state.status == 'fs'){
            setCounter(60)
            dispatch({type:"Auth_Status" , data:'n'})
        }
    } , [state.status])
  return (
        <form onSubmit={submitHandle} className='contain pt-10 pb-32'>

            <div className='mx-auto max-w-96 flex flex-col gap-y-4 my-10'>
                <InputComp type={'email'} name={'email'} title={'البريد الإليكتروني'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                {
                    counter > 0 ? 
                        <span className='center gap-4 mb-10'> <span className='text-gray-500/80'>إعادة المحاولة </span> <span className='font-bold text-lg text-mainBlue'>{counter}</span></span> 
                    : state.status == 'fl' ? <SmallLoaderComp/> 
                    : <button className='mainButton'>تأكيد</button>
                }
                <Link className='button text-gray-500' to={'/auth/login'}>تسجيل الدخول ؟ </Link>
                <Link className='button text-gray-500' to={'/auth/register/student'}>إنشاء حساب طالب ؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/instructor'}>إنشاء حساب محاضر ؟</Link>
            </div>
        </form>
  )
}

export default ForgetPasswordPage