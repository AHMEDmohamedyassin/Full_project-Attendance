import React from 'react'
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
    const location = useLocation();
    
    const titles = [
        {loc : '/lectures' , title:'المحاضرات'} ,
        {loc : '/details' , title: 'بيانات المحاضرة'},
    ]

    const title = titles.find(e => e.loc == location.pathname)

  return (
    <>
        {
            title ? (
                <div className='contain'>
                    <div className='font-bold text-lg text-gray-500 my-4'>{title.title} : </div>
                </div>
            ) : null
        }
    </>
  )
}

export default PageTitle