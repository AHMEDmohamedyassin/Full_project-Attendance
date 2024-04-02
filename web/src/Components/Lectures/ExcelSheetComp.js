import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { AttendanceLecture, ExcelLecture } from '../../redux/action/LectureAction';
import { SmallLoaderComp } from '../Public/LoaderComp';

const ExcelSheetComp = () => {
    const state = useSelector(state => state.Lecture)
    const dispatch = useDispatch()

    const data = [
        {name : 'ahmed' , code : '9210150' , sec : '2' , bn : '4' , id : '123'} ,
        {name : 'ahmed' , code : '9210150' , sec : '2' , bn : '4' , id : '123'} ,
        {name : 'ahmed' , code : '9210150' , sec : '2' , bn : '4' , id : '123'} ,
    ]

    const getDataObj = () => {
        dispatch(ExcelLecture(state.lecture_data.id))
    }

    const handleDownload = () => {
        var workbook = XLSX.utils.book_new();
        var worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook , worksheet , 'lecture');
        XLSX.writeFile(workbook, `lecture.xlsx`);
    }
  return (
    <div className='w-full center'>

        {
            state.status == 'el' ? 
                <SmallLoaderComp/>
            :
            <button 
                disabled={!state.attendance.hasMore} 
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