import React, { useEffect } from 'react'
import LectureCardComp from '../../Components/Lectures/LectureCardComp'
import { SmallLoaderComp } from '../../Components/Public/LoaderComp'
import { useDispatch , useSelector } from 'react-redux'
import { ListLecture } from '../../redux/action/LectureAction'

const LecturesPage = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.Lecture)
  
  const LoadMore = () => {
    dispatch(ListLecture({page : state.current? state.current + 1 : 1}))
  }

  useEffect(() => {
    if(!state.current) LoadMore()
  } , [])

  return (
    <div className='contain'>
      {
        state.items? (
            <div className='mainListing'>
                {
                    state.items.map((e , index) => (
                        <LectureCardComp key={index} id={e.id} title={e.title} created_at={e.created_at}/>
                    ))
                }
            </div>
        ) : null
      }

        <div className='w-full center my-10'>
          {
            state.status === "sl" ? <SmallLoaderComp/> : 
              <button disabled={!state.hasMore} onClick={LoadMore} className={`mainButton ${!state.hasMore?'bg-gray-500/50 hover:bg-gray-500/50 hover:cursor-not-allowed' : ''}`}>تحميل المزيد</button>
          }
        </div>
    </div>
  )
}

export default LecturesPage