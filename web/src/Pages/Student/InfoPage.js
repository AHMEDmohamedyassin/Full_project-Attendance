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
            <InputComp value={'value'} title={'الكلية'}/>
            <InputComp value={'value'} title={'الفصل'}/>
            <InputComp value={'value'} title={'الرقم'}/>
            <InputComp value={'value'} title={'الكود'}/>
            <InputComp value={'value'} title={'البريد الإليكتروني'}/>
            <InputComp value={'value'} title={'كلمة الرور'}/>
            <InputComp value={'value'} title={'تأكيد كلمة المرور'}/>
        </div>
        
        <div className='w-full center'>
            <button className='mainButton'>تأكيد</button>
        </div>

    </div>
  )
}

export default InfoPage