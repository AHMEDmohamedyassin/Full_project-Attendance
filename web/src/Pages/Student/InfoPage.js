import React, { useEffect, useState } from 'react'
import QrcodeComp from '../../Components/Public/QrcodeComp'
import InputComp from '../../Components/Form/InputComp'
import { useDispatch, useSelector } from 'react-redux'
import SearchBarComp from '../../Components/Public/SearchBarComp'
import { UpdateAuth } from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../../Components/Public/LoaderComp'

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
    <form onSubmit={submitHandle} className='contain'>
        <QrcodeComp/>

        <div className='mainFrom'>
            <InputComp value={state.name} name={'name'} title={'الاسم'}/>
            <InputComp value={state.phone} name={'phone'} title={'رقم الهاتف'}/>
            <InputComp value={state.sec} name={'sec'} title={'الفصل'}/>
            <InputComp value={state.bn} name={'bn'} title={'الرقم'}/>
            <InputComp value={state.code} name={'code'} title={'الكود'}/>
            <InputComp value={state.group} name={'group'} title={'المجموعة'}/>
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