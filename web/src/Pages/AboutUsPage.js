import React from 'react'
import { Link } from 'react-router-dom'

const AboutUsPage = () => {
  return (
    <div className='contain my-10 leading-10 text-gray-500' style={{wordSpacing:'4px'}}>
      <div className='lg:text-justify'>

        <p className='font-bold'>اننا بنهدف لحل مشكلة الغياب في اكثر من نقطه :</p>
        <ul className='ps-4'>
          <li>قدم الطريقه التقليديه الورقيه <span className="material-symbols-outlined lg:mx-1">note_stack</span> لاخذ الحضور مع وجود طرق احدث .</li>
          <li>معاناه الدكاتره في تفريغ الاسماء من ورق <span className="material-symbols-outlined lg:mx-1">note_stack</span> الحضور .</li>
          <li>عدم استنزاف وقت <span className="material-symbols-outlined lg:mx-1">schedule</span> المحاضرات في اخذ الحضور .</li>
        </ul>

        <p className='font-bold mt-4'>قمنا بتوفير طرق متعدد لأخذ الحضور :</p>
        <ul className='ps-4'>
          <li>ادخال كود الطالب بشكل يدوي <span className="material-symbols-outlined lg:mx-1">keyboard</span> .</li>
          <li>استخدام الكاميرا <span className="material-symbols-outlined lg:mx-1">photo_camera</span> لالتقات الرمز <span className="material-symbols-outlined lg:mx-1">qr_code_2</span> الخاص بالطالب .</li>
          <li> استخدام الرمز <span className="material-symbols-outlined lg:mx-1">qr_code_2</span> حتي يمكن للطلبة التقات الرمز<span className="material-symbols-outlined lg:mx-1">qr_code_2</span>  الخاص بالمحاضرة .</li>
          <li> اعطاء أحد الطلاب صلاحية حتي يمكنه استخدام الكاميرا <span className="material-symbols-outlined lg:mx-1">photo_camera</span> لالتقات الرمز <span className="material-symbols-outlined lg:mx-1">qr_code_2</span> الخاص بزملائه الطلاب .</li>
        </ul>
        
        <p className='font-bold mt-4'>يوفر التطبيق للمحاضر تحويل كل بيانات الطلبة من الأسماء و رقم الفصل و رقم المجموعة و الرقم بالفصل إلي ملف إكسل EXCEL لسهول تسجيل الحضور علي المحاضر</p>
      </div>

      <div className='mt-10 pt-10 border-gray-200 border-t-[1px]'>
        <h1 className='text-lg font-bold text-gray-500'>إدارة :</h1>
        <div className='flex flex-wrap lg:justify-between justify-center items-center gap-10 mt-10'>
          {/* card */}
          {/* <div className='relative w-80 h-96 shadow-mainShadow shadow-lg rounded overflow-hidden'>
            <div style={{
              backgroundImage:`url('${Ahmed}')`,
              backgroundRepeat:'no-repeat' ,
              backgroundPosition:'top' ,
              backgroundSize:'cover'
            }} className='w-full h-full'></div>
            <h1 className='absolute bottom-0 left-0 w-full text-lg text-gray-500 font-bold p-4 py-2 bg-mainWhite/50 shadow-mainShadow'>أحمد محمد ياسين</h1>
          </div> */}

          {/* card 2 */}
          <div className='text-lg font-bold hover:text-mainBlue text-gray-700 px-10 py-4 bg-mainWhite shadow-mainShadow shadow-lg rounded-lg border-[2px] border-gray-300'>أحمد محمد</div>
          <div className='text-lg font-bold hover:text-mainBlue text-gray-700 px-10 py-4 bg-mainWhite shadow-mainShadow shadow-lg rounded-lg border-[2px] border-gray-300'>علي ابراهيم</div>

        </div>
      </div>

      {/* logo */}
      <div className='w-full center mt-20'>
        <img className='lg:h-96 sm:h-64 h-32' src={'/logo/full_logo.svg'} />
      </div>
    </div>
  )
}

export default AboutUsPage