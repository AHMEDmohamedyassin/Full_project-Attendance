import React, { useEffect, useState } from 'react'
import QRCodeScannerComp from '../../Components/Lectures/QRCodeScannerComp'
import { useDispatch, useSelector } from 'react-redux'
import { AttendanceAuto } from '../../redux/action/StudentAction'
import {SmallLoaderComp} from '../../Components/Public/LoaderComp'

const ReadQrPage = () => {
  const state = useSelector(state => state.Stud)
  const dispatch = useDispatch()
  const [data , setData] = useState({
    id : 0 ,
    qr_code_ids: {
      ids : [],
      end : null
    }
  })
  const [id , setId] = useState(null)
  const [showSubmit , setShowSubmit] = useState(false)

  const submitHandle = () => {
    dispatch(AttendanceAuto(data))
  }

  // get camera qr_content and handle it to be submitted
  useEffect(() => {
    const obj = JSON.parse(id)
    if(!obj?.lect_id || !obj?.id) return 

    if(obj.end){
      setData({
        id : obj.lect_id ,
        qr_code_ids: {
          ids : [...new Set(data.qr_code_ids.ids)],
          end : obj.id
        }
      })

      return setShowSubmit(true)
    }

    setData({
      id : obj.lect_id ,
      qr_code_ids: {
        ids : [...data.qr_code_ids.ids , obj.id],
        end : null
      }
    })
  } , [id])


  // handle success and failure of submitting capture
  useEffect(() => {
    if(state.status == 'cf' || state.status == 'cs')
      dispatch({type : "Student_Status" , data : "n"})
    if(state.status == 'cs')
      setShowSubmit(false)
  } , [state])

  return (
    <div className='contain'>
      <div className='relative max-h-[800px] rounded-lg overflow-hidden border-gray-200 border-[1px] py-0'>

        {
          state.status == 'cl' ? <SmallLoaderComp/> : (
          <>
            {
              showSubmit ? 
                <button onClick={submitHandle} className='bg-mainBlue text-white px-4 py-1 rounded-lg lg:text-lg'>تسجيل الحضور</button>
                :
                <QRCodeScannerComp onResult={setId} />
            }
          </>)
        }


      </div>
      
    </div>
  )
}

export default ReadQrPage