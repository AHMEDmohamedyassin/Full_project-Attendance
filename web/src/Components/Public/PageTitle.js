import React from 'react'
import { useLocation } from 'react-router-dom';
import {routes as titles} from '../../Config'

const PageTitle = () => {
    const location = useLocation();

    const title = titles.find(e => e.loc == location.pathname)

  return (
    <>
        {
            title && (title.show === undefined || title.show === true) ? (
                <div className='contain'>
                    <div className='font-bold text-lg text-gray-500 my-4'>{title.title} : </div>
                </div>
            ) : null
        }
    </>
  )
}

export default PageTitle