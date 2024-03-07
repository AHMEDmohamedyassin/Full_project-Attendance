import React from 'react'
import LectureCardComp from '../../Components/Lectures/LectureCardComp'

const LecturesPage = () => {
  return (
    <div className='contain'>
        <div className='mainListing'>
            {
                Array(10).fill(0).map((e , index) => (
                    <LectureCardComp/>
                ))
            }
        </div>
    </div>
  )
}

export default LecturesPage