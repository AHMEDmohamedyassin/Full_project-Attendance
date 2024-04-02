import React, { useEffect, useState } from 'react'
import { ResetPasswordAuth } from '../../redux/action/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import InputComp from '../../Components/Form/InputComp'
import {SmallLoaderComp} from '../../Components/Public/LoaderComp'
import { useNavigate } from 'react-router-dom'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [obj , setObj] = useState({})

  // handling submit
  const submitHandle = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const password = form.get('password')
    const password_confirmation = form.get('confirm')

    dispatch(ResetPasswordAuth({
      ...obj ,
      password ,
      password_confirmation 
    }))
  }

  // get search parameters on page load
  useEffect(() => {
    const search_params = new URLSearchParams(window.location.search)
    setObj({
      token : search_params.get('token') ,
      email : search_params.get('email')
    })
  } , [])

  // forward to login page on password changing success
  useEffect(() => {
    if(state.status == 'ps'){
      dispatch({type:"Auth_Status" , data:'n'})
      navigate('/auth/login')
    }
  } , [state.status])
  return (
        <form onSubmit={submitHandle} className='contain pt-10 pb-32'>

            <div className='mx-auto max-w-96 flex flex-col gap-y-4 my-10'>
                <InputComp name={'password'} title={'كلمة مرور جديدة'}/>
                <InputComp name={'confirm'} title={'تأكيد كلمة المرور'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                {
                    state.status == 'pl' ? <SmallLoaderComp/> : 
                        <button className='mainButton'>تأكيد</button>
                }
            </div>
        </form>
  )
}

export default ResetPasswordPage