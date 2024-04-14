import {store} from '../store'
import {fetching} from '../fetch'
import { AttendanceLecture_Url, AttendanceSubmit_Url, CreateLecture_URL, DeleteLecture_Url, ManualPermissionAttendance_Url, QRActivateLecture_Url, ReadLecture_Url, SearchLecture_Url } from '../Url'
import { notify } from '../../Components/Public/notification'
import * as XLSX from 'xlsx';

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

        dispatch(ListLecture({page:1}))
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

        if(!obj.page || obj.page ==1){
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

        let res = req.res
        if(res.qr_ids)
            res.qr_ids = JSON.parse(res.qr_ids)

        dispatch({
            type:"Lecture_Data" ,
            data : {
                status : 'n' ,
                lecture_data : res ,
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

        if(!obj.page || obj.page == 1){
            dispatch({
                type:"Lecture_Data" ,
                data : {
                    status : 'n' ,
                    attendance : req.res
                }
            })
            return 
        }

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


/**
 * submit attendance
 */
export const SubmitAttendanceLecture = (obj) => {
    return async dispatch => {
        dispatch({type:"Lecture_Status" , data : "ml"})
        const token = store.getState().Auth.token
        const role = store.getState().Auth.role

        // check if user is student or instructor
        let url = AttendanceSubmit_Url
        if(role == 2) url = ManualPermissionAttendance_Url

        const req = await fetching(url , {...obj , token})
        
        
        if(!req.success || !req.res.attached_ids_count){ 
            notify('لم يتم تسجيل الطلاب')
            return dispatch({type:"Lecture_Status" , data : "mf"}) 
        }
        
        dispatch({type:"Lecture_Status" , data : "ms"})

        notify(`تم تسجيل عدد ${req.res.attached_ids_count} طلاب`)

        dispatch(AttendanceLecture({
            page : 1 , id : obj.id
        }))
    }
}


/**
 * delete lecture
 */
export const DeleteLecture = (obj) => {
    return async dispatch => {
        dispatch({type:"Lecture_Status" , data : "dl"})
        const token = store.getState().Auth.token
        let items = store.getState().Lecture.items
        
        const req = await fetching(DeleteLecture_Url , {...obj , token})
        
        dispatch({type:"Lecture_Status" , data : "n"})
        
        if(!req.success) return notify('لم يتم حذف المحاضرة')

        notify('تم حذف المحاضرة')

        console.log(items)
        items = items.filter(e => e.id != obj.lecture_id)
        console.log(items)

        dispatch({
            type:"Lecture_Data" ,
            data : {
                items 
            }
        })
    }
}


/**
 * activate qr
 */
export const QRActivateLecture = (id) => {
    return async dispatch => {
        dispatch({type:"Lecture_Status" , data : "ql"})
        const token = store.getState().Auth.token

        const req = await fetching(QRActivateLecture_Url , {token , id})

        if(!req.success) return dispatch({type:"Lecture_Status" , data : "qf"})

        return dispatch({type:"Lecture_Status" , data : "qs"})
    }
}


/**
 * get attendance for excelSheet 
 */
export const ExcelLecture = (id) => {
    return async dispatch => {
        store.dispatch({type:"Lecture_Status" , data : "el"})
        const token = store.getState().Auth?.token 
        const lecture_name = store.getState().Lecture?.lecture_data?.title 
        
        try{
            let data = {}
            let hasMore = true
            let current = 0
            let items = []
            let allowable_trials = 2;
    
            while (hasMore ) {
                const req = await fetching(AttendanceLecture_Url , {id , token , page:current + 1 , perpage : 10})
        
                if(!req.success) {
                    // safe from infinity looping
                    allowable_trials -= 1
                    continue
                } 
        
                data = req.res
                items = [...items , ...data.items]
                delete data.items
                current = data.current
                hasMore = data.hasMore
        
            }
    
            dispatch({
                type:"Lecture_Data" ,
                data : {
                    status : 'n' ,
                    attendance : {
                        ...data , 
                        items
                    }
                }
            })
    
            // creating json for excel file
            let ids = []
            const filtered = items.filter(e => {
                if(ids.includes(e.id))
                    return false
                ids.push(e.id)
                return true
            })
            const json = filtered.map(e => {
                let main_data = {
                    id : e.id,
                    name : e.name ,
                    phone : e.phone
                }
    
                if(e.json_data){
                    const data = JSON.parse(e.json_data)
                    main_data = {...main_data , ...data}
                } 
    
                return main_data
            })
    
            // creating and downloading  excel file
            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.json_to_sheet(json);
            XLSX.utils.book_append_sheet(workbook , worksheet , 'lecture');
            XLSX.writeFile(workbook, `${lecture_name ?? 'lecture'}.xlsx`);

            notify(`تم تحميل ملف إكسل للمحاضرة : ${lecture_name ? lecture_name : null}`)
        }catch(e) {
            notify('حدث مشكلة ما أثناء إعداد ملف الإكسل')
        }
    }
}