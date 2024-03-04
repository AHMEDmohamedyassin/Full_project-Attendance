import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const HeaderComp = () => {
  const location = useLocation();
  const routes = [
    {loc : '/' , title: 'الرئيسية'},
    {loc : '/lectures' , title: 'المحاضرات'},
    {loc : '/details' , title: 'بيانات المحاضرة'},
  ]

  return (
    <div className='bg-mainWhite py-4 border-b-[1px] border-gray-200 shadow-sm'>
        <div className='contain flex items-center justify-between my-0'>
            <Link className='' to={'/'}><span className="material-symbols-outlined">android</span></Link>

            <div className='flex gap-4 font-semibold'>
              {
                routes.map((route , index) => (
                  <Link key={index} to={route.loc} className={`hover:text-mainBlue hover:underline ${location.pathname == route.loc ? 'text-mainBlue underline' : 'text-gray-700'}`}>{route.title}</Link>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default HeaderComp