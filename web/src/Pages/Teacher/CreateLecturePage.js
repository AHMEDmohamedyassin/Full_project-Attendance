import React, { useState } from 'react'
import InputComp from '../../Components/Form/InputComp'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CreateLecture } from '../../redux/action/LectureAction'

const CreateLecturePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hours , setHours] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)
        let obj = {
            'exp_hours' : hours
        }

        for(const pair of form.entries())
            obj[pair[0]] = pair[1]

        
        dispatch(CreateLecture(obj))

        navigate('/lectures/instructor')
    }

  return (
    <div className='contain'>
        <form onSubmit={handleSubmit} className='mx-auto max-w-96 flex flex-col gap-y-6 my-10'>

            <InputComp name={'title'} placeholder={'عنوان المحاضرة'} title={'عنوان المحاضرة'} />
            
            <div className='flex flex-wrap items-end gap-y-2 gap-x-6'>

                <label className='w-full font-bold text-sm text-gray-500'>عدد الساعات المتاحة للتسجيل</label>
                <input name='exp_hours' disabled value={hours} type='number' className='mainInput w-24 text-center' />
                <div className='center gap-2'>
                    <span onClick={() => setHours(hours + 1)} className="material-symbols-outlined mainButton p-1 py-0 lg:text-3xl text-2xl bg-sky-500 hover:bg-sky-500/80">expand_less</span>
                    <span onClick={() => hours > 1 ? setHours(hours - 1) : null} className="material-symbols-outlined mainButton p-1 py-0 lg:text-3xl text-2xl bg-gray-500 hover:bg-gray-500/80">expand_more</span>
                </div>
            </div>
            
            <button className='w-fit mx-auto mainButton'>تأكيد</button>
        </form>
    </div>
  )
}

export default CreateLecturePage