import React from 'react'

const ContactUsPage = () => {
  return (
    <div className='contain'> 
        <div className='bg-background lg:px-10 px-4 py-10 mb-10 lg:w-2/4'>
            {/* email */}
            <div className='flex sm:flex-nowrap flex-wrap items-center gap-4 border-b-[1px] border-gray-200 py-10'>
                <h1 className='text-lg font-bold text-gray-700 whitespace-nowrap'>البريد الإليكتروني / </h1>
                <a className='text-mainblue sm:text-xl text-lg hover:text-mainBlue' style={{wordWrap:'anywhere'}} href='mailto:AttendedMe@hotmail.com'>AttendedMe@hotmail.com</a>
            </div>
            {/* mobile phone */}
            <div className='flex sm:flex-nowrap flex-wrap gap-4 border-b-[1px] border-gray-200 py-10'>
                <h1 className='text-lg font-bold text-gray-700 whitespace-nowrap'>أرقام الهاتف / </h1>
                <div className='flex items-center justify-start flex-wrap gap-2'>
                    <a className='text-mainblue text-lg hover:text-mainBlue' href='tel:01066404523'>01066404523</a>
                    <a className='text-mainblue text-lg hover:text-mainBlue' href='tel:01551302003'>01551302003</a>
                </div>
            </div>
            {/* whatsapp number */}
            <div className='flex sm:flex-nowrap flex-wrap gap-4 border-b-[1px] border-gray-200 py-10'>
                <h1 className='text-lg font-bold text-gray-700 whitespace-nowrap'>أرقام الواتساب / </h1>
                <div className='flex items-center justify-start flex-wrap gap-2'>
                    <a className='text-mainblue text-lg hover:text-mainBlue' href='whatsapp://send?phone=+201066404523'>01066404523</a>
                    <a className='text-mainblue text-lg hover:text-mainBlue' href='whatsapp://send?phone=+201551302003'>01551302003</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUsPage