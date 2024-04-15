import React, { useEffect, useState } from 'react'
import {routes} from '../../Config'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FooterComp = () => {
    const state = useSelector(state => state.Auth)
    const [links , setLinks] = useState([])

    useEffect(() => {
        const links = routes.filter(e => {
          if(!state.role) return ['public' , 'publicOnly'].includes(e.footer)
          if(state.role == 1) return ['public' , 'instructor'].includes(e.footer)
          if(state.role == 2) return ['public' , 'student'].includes(e.footer)
        })
        setLinks(links)
      } , [state])
  return (
    <div className='mt-10 pt-10 bg-mainWhite border-t-mainBlue border-[1px]'>
        <div className='contain'>
            {/* upper part */}
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-8'>
                {/* links part */}
                <div>
                    <h1 className='font-bold text-gray-700 lg:text-lg mb-4'>روابط :</h1>
                    <div className='flex flex-col gap-y-4'>
                        {links.map((e , index) => (
                            <Link className='text-gray-700 font-semibold hover:text-mainBlue' key={index} to={e.loc}>{e.title}</Link>
                        ))}
                    </div>
                </div>
                {/* details part */}
                <div>
                    <h1 className='font-bold text-gray-700 text-lg mb-4'>الخدمات التي يوفرها الموقع :</h1>
                    <div className='flex flex-col gap-y-4'>
                        <div className='text-gray-500 font-semibold hover:text-mainBlue'>ادخال كود الطالب بشكل يدوي <span className="material-symbols-outlined mx-1">keyboard</span> .</div>
                        <div className='text-gray-500 font-semibold hover:text-mainBlue'>استخدام الكاميرا <span className="material-symbols-outlined mx-1">photo_camera</span> لالتقات الرمز <span className="material-symbols-outlined mx-1">qr_code_2</span> الخاص بالطالب .</div>
                        <div className='text-gray-500 font-semibold hover:text-mainBlue'> استخدام الرمز <span className="material-symbols-outlined mx-1">qr_code_2</span> حتي يمكن للطلبة التقات الرمز<span className="material-symbols-outlined mx-1">qr_code_2</span>  الخاص بالمحاضرة .</div>
                        <div className='text-gray-500 font-semibold hover:text-mainBlue'> اعطاء أحد الطلاب صلاحية حتي يمكنه استخدام الكاميرا <span className="material-symbols-outlined mx-1">photo_camera</span> لالتقات الرمز <span className="material-symbols-outlined mx-1">qr_code_2</span> الخاص بزملائه الطلاب .</div>
                    </div>
                </div>
            </div>

        </div>

        {/* border */}
        <div className='w-full h-[1px] bg-mainBlue/50 mt-10'></div>

        {/* lower part */}
        <div className='w-full text-gray-400 font-bold text-center py-2 button'>
            جميع الحقوق محفوظة 
        </div>

    </div>
  )
}

export default FooterComp