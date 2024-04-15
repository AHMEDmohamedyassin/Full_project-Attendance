import React, { useEffect, useRef, useState } from 'react'
import QrcodeComp from '../../Components/Public/QrcodeComp'
import InputComp from '../../Components/Form/InputComp'
import { useDispatch, useSelector } from 'react-redux'
import { CollageAuth, UpdateAuth } from '../../redux/action/AuthAction'
import {SmallLoaderComp} from '../../Components/Public/LoaderComp'
import SearchBarComp from '../../Components/Public/SearchBarComp'

const InfoPage = () => {
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [val , setVal]= useState({})

  // submit updates
  const submitHandle = (e) => {
    e.preventDefault()

    const form = new FormData(e.target)

    let obj = {
      name : form.get('name') ,
      collage_id : form.get('search') ,
      phone : form.get('phone') ,
      is_student : false
    }

    dispatch(UpdateAuth(obj))
  }

  // initiat collage value
  useEffect(() => {
    if(state?.collage?.ar_name){
      setVal({
        title : state.collage.ar_name ,
        id : state.collage.id
      })
    }
  } , [state])
  return (
    <form onSubmit={submitHandle} className='contain'>
        <QrcodeComp/>

        {/* instructor id */}
        <div className='w-full center my-6 gap-x-2'>
          <div className='text-gray-500 font-bold'>الكود : </div>
          <div className='text-mainBlue font-bold text-xl'>{state.id}</div>
        </div>

        <div className='mainFrom'>
            <InputComp name={'name'} value={state.name} title={'الاسم'} required={true}/>
            <InputComp name={'phone'} value={state.phone} title={'رقم الهاتف'} required={true}/>
            {/* <InputComp name={'email'} value={state.email} title={'البريد الإليكتروني'}/> */}
            <SearchBarComp value={val}/>
        </div>
        
        <div className='w-full center'>
            {
              state.status == 'ul' ? 
                <SmallLoaderComp/>
                : <button className='mainButton'>تأكيد</button>
            }
        </div>

    </form>
  )
}

export default InfoPage