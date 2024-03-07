import React from 'react'
import QrcodeComp from '../../Components/Public/QrcodeComp'
import InputComp from '../../Components/Form/InputComp'

const InfoPage = () => {
  return (
    <div className='contain'>
        <QrcodeComp/>

        <div className='mainFrom'>
            <InputComp value={'value'} title={'الاسم'}/>
            <InputComp value={'value'} title={'رقم الهاتف'}/>
            <InputComp value={'value'} title={'البريد الإليكتروني'}/>
            <InputComp value={'value'} title={'الكلية'}/>
        </div>
        
        <div className='w-full center'>
            <button className='mainButton'>تأكيد</button>
        </div>

    </div>
  )
}

export default InfoPage