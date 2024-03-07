import React from 'react'

const InputComp = ({title , name , type , placeholder , value}) => {
  return (
        <div className='w-full flex flex-col gap-y-2'>
            <label className='font-bold text-sm text-gray-500'>{title}</label>
            <input defaultValue={value} name={name} placeholder={placeholder} type={type?type : 'text'} className='mainInput w-full' />
        </div>
  )
}

export default InputComp