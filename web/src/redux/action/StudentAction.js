import { notify } from '../../Components/Public/notification'
import { AutoAttendance_Url, StudentAttendance_Url } from '../Url'
import {fetching} from '../fetch'
import { store } from '../store'


/**
 * get student attendance
 */
export const AttendanceStudent = (obj) => {
    return async dispatch => {
        dispatch({type : "Student_Status" , data : "al"})
        const token = store.getState().Auth?.token
        
        const req = await fetching(StudentAttendance_Url , {token , page:1 , ...obj})
        
        dispatch({type : "Student_Status" , data : "n"})
        if(!req.success) return 

        let res = req.res
        let items = res.items
        delete res.items

        if(!obj?.page || obj?.page == 1){
            dispatch({
                type : "Student_Data",
                data : {
                    ...res ,
                    items
                }
            })
            return 
        }

        dispatch({
            type : "Student_Items",
            data : res ,
            items : items
        })
    }
}


/**
 * Auto Attendance
 */
export const AttendanceAuto = (obj) => {
    return async dispatch =>{
        dispatch({type : "Student_Status" , data : "cl"})
        const token = store.getState().Auth?.token

        const req = await fetching(AutoAttendance_Url , {token , ...obj})

        if(!req.success){ 
            notify('فشل تسجيل الحضور الرجاء إعادة المحاولة')
            dispatch({type:"Student_Data"  , data : {error : JSON.stringify({token , ...obj})}})
            return dispatch({type : "Student_Status" , data : "cf"})
        }

        dispatch({type : "Student_Status" , data : "cs"})

        notify('تم تسجيل الحضور')
    }
}
