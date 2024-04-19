import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import {routes} from '../../Config'
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAuth } from '../../redux/action/AuthAction';

const HeaderComp = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [showList , setShowList] = useState(false)
  const [links , setLinks] = useState([]);

  const handleLogout = () => {
    dispatch(LogoutAuth())
    navigate('/')
  }

  useEffect(() => {
    const links = routes.filter(e => {
      if(!state.role) return ['public' , 'publicOnly'].includes(e.nav)
      if(state.role == 1) return e.nav == 'instructor' 
      if(state.role == 2) return e.nav == 'student'
    })
    setLinks(links)
  } , [state])

  return (
    <div className='z-50 relative bg-mainWhite py-4 border-b-[1px] border-gray-200 shadow-sm'>
        <div className='relative contain flex items-center justify-between my-0'>
            <Link className='' to={'/'}>
              <img className='absolute h-12 bottom-2/4 translate-y-2/4 lg:right-20 right-5 left-0' src={'/logo/logo.svg'} />
            </Link>

            {/* nav links */}
            <div className='hidden lg:flex gap-4 font-semibold'>
              {
                links.map((route , index) => (
                  <Link key={index} to={route.loc} className={`hover:text-mainBlue  ${location.pathname == route.loc ? 'text-mainBlue ' : 'text-gray-700'}`}>{route.title}</Link>
                ))
              }
              {/* logout button for large screen  */}
              <button style={{display:state.token ? "flex" : 'none'}} onClick={handleLogout} className='button text-sm flex items-center gap-2 text-gray-400 hover:text-red-500'>
                <span className='text-sm'>تسجيل الخروج</span>
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
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
              links.map((route , index) => (
                <Link key={index} to={route.loc} onClick={() => setShowList(false)} className={`py-2 border-gray-200 border-[1px] contain font-semibold hover:text-mainBlue ${location.pathname == route.loc ? 'text-mainBlue ' : 'text-gray-700'}`}>{route.title}</Link>
              ))
            }
            {/* logout button for small screen  */}
            <button style={{display:state.token ? "flex" : 'none'}} onClick={handleLogout} className='contain my-4 text-md flex items-center gap-2 text-red-500'>
              <span className=''>تسجيل الخروج</span>
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
        </div>
    </div>
  )
}

export default HeaderComp