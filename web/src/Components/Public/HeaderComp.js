import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {routes} from '../../Config'

const HeaderComp = () => {
  const location = useLocation();
  const [showList , setShowList] = useState(false)

  return (
    <div className='relative bg-mainWhite py-4 border-b-[1px] border-gray-200 shadow-sm'>
        <div className='contain flex items-center justify-between my-0'>
            <Link className='' to={'/'}><span className="material-symbols-outlined">android</span></Link>

            <div className='hidden lg:flex gap-4 font-semibold'>
              {
                routes.filter(e => e.nav || e.nav === undefined ? true : false).map((route , index) => (
                  <Link key={index} to={route.loc} className={`hover:text-mainBlue  ${location.pathname == route.loc ? 'text-mainBlue ' : 'text-gray-700'}`}>{route.title}</Link>
                ))
              }
            </div>
            
            {
              showList? 
                <span onClick={() => setShowList(!showList)} className="material-symbols-outlined  lg:hidden text-red-500 hover:cursor-pointer">close</span>
                : <span onClick={() => setShowList(!showList)} className="material-symbols-outlined  lg:hidden text-gray-700 button">menu</span>
            }
        </div>

        {/* list for small screen */}
        <div style={{display: showList ? 'flex' : 'none'}} className='w-full absolute top-full flex flex-col bg-mainWhite border-gray-200 border-[1px]'>
            {
              routes.filter(e => e.nav || e.nav === undefined ? true : false).map((route , index) => (
                <Link key={index} to={route.loc} onClick={() => setShowList(false)} className={`py-2 border-gray-200 border-[1px] contain font-semibold hover:text-mainBlue ${location.pathname == route.loc ? 'text-mainBlue ' : 'text-gray-700'}`}>{route.title}</Link>
              ))
            }
        </div>
    </div>
  )
}

export default HeaderComp