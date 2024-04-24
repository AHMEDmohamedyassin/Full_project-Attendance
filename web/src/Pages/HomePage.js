import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-y-20'>

      

      {/* usage ways  */}
      <div className='contain flex flex-wrap lg:flex-row flex-col lg:justify-between items-center gap-6'>
          <h1 className='w-full lg:text-xl font-bold text-gray-500 mb-10'>توفير طرق مختلفة لتسجيل الحضور : </h1>

          {/* card */}
          <div className='center flex-col gap-1 lg:gap-2 w-full'>
            <span class="material-symbols-outlined text-[100px] lg:text-[300px] text-gray-500">qr_code_scanner</span>
            <h2 className='text-mainBlue text-lg font-bold'>استخدام الرمز</h2>
          </div>

          {/* card */}
          <div className='center flex-col gap-1 lg:gap-2'>
            <span class="material-symbols-outlined text-[100px] lg:text-[200px] text-gray-500">fact_check</span>
            <h2 className='text-mainBlue text-lg font-bold'>استخدام الصلاحيات</h2>
          </div>
          
          {/* card */}
          <div className='center flex-col gap-1 lg:gap-2'>
            <span class="material-symbols-outlined text-[100px] lg:text-[200px] text-gray-500">photo_camera</span>
            <h2 className='text-mainBlue text-lg font-bold'>استخدام الكاميرا</h2>
          </div>

          {/* card */}
          <div className='center flex-col gap-1 lg:gap-2'>
            <span class="material-symbols-outlined text-[100px] lg:text-[200px] text-gray-500">keyboard_keys</span>
            <h2 className='text-mainBlue text-lg font-bold'>إدخال يدوي</h2>
          </div>
      </div>



      {/* border */}
      <div className='h-[1px] w-full bg-gray-200'></div>


      {/* how to use  */}
      <div className='contain flex flex-wrap lg:flex-row flex-col justify-between items-center gap-8'>
        <h1 className='w-full lg:text-xl font-bold text-gray-500 mb-10'>طرية الاستخدام : </h1>

        {/* card */}
        <div className='center flex-col lg:gap-y-4 gap-y-2'>
          <div className='border-gray-200 border-[1px] rounded-lg shadow-mainShadow overflow-hidden max-w-[200px] lg:max-w-[400px] aspect-square center'>
          <iframe width="1280" height="720" src="https://www.youtube.com/embed/gQUs9yCrMNI" title="عاجل | إطلاق عشرات الصواريخ من لبنان باتجاه الجليل" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <a target='_blank' href='https://www.youtube.com/embed/gQUs9yCrMNI' className='text-mainBlue text-lg font-bold'>طريقة الاستخدام للمحاضر</a>
        </div>

        {/* card */}
        <div className='center flex-col lg:gap-y-4 gap-y-2'>
          <div className='border-gray-200 border-[1px] rounded-lg shadow-mainShadow overflow-hidden max-w-[200px] lg:max-w-[400px] aspect-square center'>
          <iframe width="1280" height="720" src="https://www.youtube.com/embed/gQUs9yCrMNI" title="عاجل | إطلاق عشرات الصواريخ من لبنان باتجاه الجليل" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <a target='_blank' href='https://www.youtube.com/embed/gQUs9yCrMNI' className='text-mainBlue text-lg font-bold'>طريقة الاستخدام للطالب</a>
        </div>

      </div>

    </div>
  )
}

export default HomePage