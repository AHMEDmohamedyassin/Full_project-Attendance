import React from 'react'

const AboutUsPage = () => {
  return (
    <div className='contain my-10 leading-10 text-gray-500' style={{wordSpacing:'4px'}}>
      <div>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها. </div>

      <div className='mt-10 pt-10 border-gray-200 border-t-[1px]'>
        <h1 className='text-lg font-bold text-gray-500'>تحت إدارة :</h1>
        <div className='flex flex-wrap justify-between gap-10 mt-10'>
          {/* card */}
          <div className='relative w-80 h-96 shadow-mainShadow shadow-lg rounded overflow-hidden'>
            <img className='w-full h-full' src='https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
            <h1 className='absolute bottom-0 left-0 w-full text-lg text-gray-500 font-bold p-4 py-2 bg-mainWhite/50 shadow-mainShadow'>أحمد محمد ياسين</h1>
          </div>

          {/* card */}
          <div className='relative w-80 h-96 shadow-mainShadow shadow-lg rounded overflow-hidden'>
            <img className='w-full h-full' src='https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
            <h1 className='absolute bottom-0 left-0 w-full text-lg text-gray-500 font-bold p-4 py-2 bg-mainWhite/50 shadow-mainShadow'>أحمد محمد ياسين</h1>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AboutUsPage