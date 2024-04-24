import React, { useEffect, useState } from 'react'

const AlertComp = ({confirm , showing , setShowing , msg}) => {
    const [show , setShow] = useState(false)

    const handleClose = () => {
        if(setShowing) setShowing(false)
        setShow(false)
    }

    const handleConfirm = () => {
        if(confirm) confirm()
        handleClose()
    }

    useEffect(() => {
        setShow(showing)
    } , [showing])
  return (
    <>
        {
            show ?
            (
                <div className='fixed w-full h-full top-0 left-0 bg-black/20 z-50 center'>
                    <div className='w-96 bg-white px-10 py-6 rounded-lg center flex-col gap-y-10'>
                        <div className='font-semibold'>{msg }</div>
                        <div className='w-full flex justify-between'>
                            <button onClick={handleConfirm} className='mainButton'>تأكيد</button>
                            <button onClick={handleClose} className='mainButton'>إلغاء</button>
                        </div>
                    </div>
                </div>
            )
        :null
        }
    </>
  )
}

export default AlertComp