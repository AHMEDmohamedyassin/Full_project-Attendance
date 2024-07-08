import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { AttendanceLecture, ExcelLecture } from '../../redux/action/LectureAction';
import { SmallLoaderComp } from '../Public/LoaderComp';

const ExcelSheetComp = () => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()

    const getDataObj = () => {
        dispatch(ExcelLecture(state.lecture_data.id))
    }
  return (
    <div className='w-full center'>

        {
            state.status == 'el' ? 
                <SmallLoaderComp/>
            :
            <button 
                disabled={!state.attendance.total} 
                onClick={getDataObj} 
                className={`center gap-2 bg-green-500 hover:bg-green-500/80 text-lg text-white 
                rounded-lg border-gray-200 shadow-md shadow-mainShadow hover:cursor-pointer px-6 py-1 disabled:bg-gray-500 disabled:cursor-not-allowed`}
            >
                <span>تحميل ملف اكسل</span>
                <span className="material-symbols-outlined">download</span>
            </button>
        }
    </div>
  )
}

export default ExcelSheetComp