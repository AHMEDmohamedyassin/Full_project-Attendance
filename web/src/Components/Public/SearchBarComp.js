import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CollageAuth } from '../../redux/action/AuthAction'
import { SmallLoaderComp } from './LoaderComp'

const SearchBarComp = ({value}) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.Auth)
    const [search , setSearch]= useState('')
    const [val , setVal]= useState({})
    const [showInput , setShowInput] = useState(false)
  
    const submitSearch = (e) => {
      setSearch('')
      setVal({id:e.id , title : e.ar_name})
      setShowInput(false)
    } 
  
    // searching
    useEffect(() => {
      if(search)
        dispatch(CollageAuth({title:search , page:1}))
    } , [search])

    useEffect(() => {
        if(value && !Object.keys(val).length)
            setVal(value)
    } , [value])
  return (
            <div className='w-full'>
              <div className='w-full flex flex-col gap-y-2'>
                <label className='font-bold text-sm text-gray-500'>الكلية</label>
                <input name='search' value={val.id} hidden/>
                {
                  showInput ? 
                  <input autoFocus onBlur={() => setShowInput(false)} onChange={e => setSearch(e.target.value)} className='mainInput w-full' />
                  :
                  <div onClick={() => setShowInput(true)} className='mainInput w-full h-10 center justify-start' >{val.title}</div>
                }
              </div>
              {
                search ? 
                  <div className='w-full border-[1px] border-gray-200 shadow-mainShadow shadow-lg flex flex-col mt-3 rounded-lg'>
                    {
                      state.status == 'cl' ? 
                        <div className='w-full center'>
                          <SmallLoaderComp/> 
                        </div>
                      :
                      <>
                      {
                        state.collage_list.map((e , index) => 
                          <div key={index} onClick={() => submitSearch(e)} className='px-2 py-2 hover:font-bold border-y-[1px] hover:border-gray-200 border-transparent hover:cursor-pointer hover:text-mainBlue'>{e.ar_name}</div>
                        )
                      }
                      </>
                    }
                  </div>
                :null
              }
            </div>
  )
}

export default SearchBarComp