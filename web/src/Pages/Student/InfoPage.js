import React, { useEffect, useState } from 'react'
import QrcodeComp from '../../Components/Public/QrcodeComp'
import InputComp from '../../Components/Form/InputComp'
import { useDispatch, useSelector } from 'react-redux'
import SearchBarComp from '../../Components/Public/SearchBarComp'
import { AttPermissionAuth, UpdateAuth } from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../../Components/Public/LoaderComp'
import PermissionsComp from '../../Components/Permissions/PermissionsComp'
import {titles} from '../../Config'

const InfoPage = () => {
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [val , setVal ] = useState({})
  const submitHandle = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    
    let obj = {
      is_student : true 
    }

    if(form.get('search'))
      obj['collage_id'] = form.get('search')

    for(const key of form.entries()){
      obj[key[0]] = key[1]
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
    <div className='contain'>
        <div className='flex flex-wrap gap-x-4 justify-center items-center'>
          <QrcodeComp/>
          <PermissionsComp/>
        </div>

        {/* student id */}
        <div className='w-full center my-6 gap-x-2'>
          <div className='text-gray-500 font-bold'>الكود : </div>
          <div className='text-mainBlue font-bold text-xl'>{state.id}</div>
        </div>

        <form onSubmit={submitHandle}>
          <div className='mainFrom'>
              <InputComp value={state.name} name={'name'} title={'الاسم'}/>
              <InputComp value={state.phone} name={'phone'} title={'رقم الهاتف'}/>
              <InputComp value={state.sec} name={'sec'} title={titles?.sec}/>
              <InputComp value={state.bn} name={'bn'} title={titles?.bn}/>
              <InputComp value={state.code} name={'code'} title={titles?.id}/>
              <InputComp value={state.group} name={'group'} title={titles?.group}/>
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

    </div>
  )
}

export default InfoPage