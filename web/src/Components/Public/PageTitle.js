import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {routes as titles} from '../../Config'

const PageTitle = () => {
    const location = useLocation();

    const title = titles.find(e => e.loc == location.pathname)

    useEffect(() => {
        if(title && (title.show === undefined || title.show === true) )
            document.title = title.title
        else document.title = 'غير موجود'
    } , [title])
  return (
    <>
        {
            title && (title.show === undefined || title.show === true) ? (
                <>
                    <div className='contain'>
                        <div className='font-bold lg:text-lg text-gray-500 my-4'>{title.title} : </div>
                    </div>
                </>
            ) : null
        }
    </>
  )
}

export default PageTitle