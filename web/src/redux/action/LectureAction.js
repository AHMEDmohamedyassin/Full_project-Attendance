import {store} from '../store'
import {fetching} from '../fetch'
import { AttendanceLecture_Url, CreateLecture_URL, ReadLecture_Url, SearchLecture_Url } from '../Url'
import { notify } from '../../Components/Public/notification'

/**
 * create lecture
 */
export const CreateLecture = (obj) => {
    return async dispatch => {
        store.dispatch({type:"Lecture_Status" , data : "cl"})
        const token = store.getState().Auth?.token

        notify('جاري التحميل')

        const req = await fetching(CreateLecture_URL , {token , ...obj})

        if(!req.success) return store.dispatch({type:"Lecture_Status" , data : "n"})

        notify('تم إنشاء المحاضرة')
    }
}


/**
 * list lectures
 */
export const ListLecture = (obj) => {
    return async dispatch => {
        store.dispatch({type:"Lecture_Status" , data : "sl"})
        const token = store.getState().Auth?.token

        const req = await fetching(SearchLecture_Url , {token , page:1 , ...obj})

        store.dispatch({type:"Lecture_Status" , data : "n"})

        if(!req.success) return  

        let data = req.res
        let items = data.items
        delete data.items

        if(obj.page ==1){
            return dispatch({
                type:"Lecture_Data",
                data : {
                    ...data , items
                }
            })
        }

        dispatch({
            type:"Lecture_Listing",
            data , items
        })

    }
}


/**
 * lecture read and get first page of attendance
 */
export const ReadLecture = (id) => {
    return async dispatch => {
        store.dispatch({type:"Lecture_Status" , data : "rl"})
        const token = store.getState().Auth?.token

        const req = await fetching(ReadLecture_Url , {token , id})
        const attendance_req = await fetching(AttendanceLecture_Url , {token , id , page:1})

        if(!req.success || !attendance_req.success) return store.dispatch({type:"Lecture_Status" , data : "rf"})

        dispatch({
            type:"Lecture_Data" ,
            data : {
                status : 'n' ,
                lecture_data : req.res ,
                attendance : attendance_req.res
            }
        })
    }
}


/**
 * load more attendances for lecture
 */
export const AttendanceLecture = (obj) => {
    return async dispatch => {
        store.dispatch({type:"Lecture_Status" , data : "al"})
        const token = store.getState().Auth?.token 

        const req = await fetching(AttendanceLecture_Url , {token , page:1 , ...obj})

        store.dispatch({type:"Lecture_Status" , data : "n"})

        if(!req.success) return 

        let data = req.res
        let items = data.items
        delete data.items

        dispatch({
            type:"Lecture_Attendance" ,
            data ,
            items
        })
    }
}