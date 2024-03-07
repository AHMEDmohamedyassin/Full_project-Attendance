import React from 'react'
import {routes} from '../../Config'
import { Link } from 'react-router-dom'

const FooterComp = () => {
  return (
    <div className='mt-10 pt-10 bg-mainWhite border-t-mainBlue border-[1px]'>
        <div className='contain'>
            {/* upper part */}
            <div className='grid grid-cols-2'>
                {/* links part */}
                <div>
                    <h1 className='font-bold text-gray-700 text-lg mb-4'>روابط :</h1>
                    <div className='flex flex-col gap-y-4'>
                        {routes.map((e , index) => (
                            <Link className='text-gray-700 font-semibold hover:text-mainBlue' key={index} to={e.loc}>{e.title}</Link>
                        ))}
                    </div>
                </div>
                {/* details part */}
                <div>
                    <h1 className='font-bold text-gray-700 text-lg mb-4'>الخدمات التي يوفرها الموقع :</h1>
                    <div className='flex flex-col gap-y-4'>
                        <div className='text-gray-700 font-semibold hover:text-mainBlue'>التحضير عن طريق ال QR code</div>
                        <div className='text-gray-700 font-semibold hover:text-mainBlue'>التحضير عن طريق ال QR code</div>
                        <div className='text-gray-700 font-semibold hover:text-mainBlue'>التحضير عن طريق ال QR code</div>
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