// based on Lecture Reducer

import { LecturePermissionCreate_Url, LecturePermissionDelete_Url, LecturePermissions_Url } from "../Url"
import { fetching } from "../fetch"
import { store } from "../store"


/**
 * listing permissions for lectures
 */
export const ListLectPermissionLecture = (id) => {
    return async dispatch => {
        const token = store.getState().Auth?.token 
        store.dispatch({type:"Lecture_Status" , data : "lpl"})
        
        const req = await fetching(LecturePermissions_Url , {page : 1 , token , id})
        
        store.dispatch({type:"Lecture_Status" , data : "n"})
        if(!req.success) return 

        dispatch({
            type : "Lecture_Data" ,
            data : {
                lecture_permission : req.res.items
            }
        })
    }
}


/**
 * delete lecture permission
 */
export const DeleteLectPermissionLecture = (attendance_id) => {
    return async dispatch => {
        const token = store.getState().Auth?.token 
        const lect_id = store.getState().Lecture?.lecture_data?.id
        store.dispatch({type:"Lecture_Status" , data : `d${attendance_id}pl`})
        
        const req = await fetching(LecturePermissionDelete_Url , {token , attendance_id})
        
        store.dispatch({type:"Lecture_Status" , data : "n"})

        if(req.success) return store.dispatch(ListLectPermissionLecture(lect_id))
    }
}


/**
 * create lecture permission
 */

export const CreateLectPermissionLecture = (obj) => {
    return async dispatch => {
        const token = store.getState().Auth?.token 
        const lect_id = store.getState().Lecture?.lecture_data?.id

        store.dispatch({type:"Lecture_Status" , data : `cpl`})
        
        const req = await fetching(LecturePermissionCreate_Url , {token , lect_id , ...obj})
        
        store.dispatch({type:"Lecture_Status" , data : "n"})

        if(!req.success) return 

        const permissions = store.getState().Lecture?.lecture_permission

        dispatch({
            type : "Lecture_Data" ,
            data : {
                lecture_permission : [
                    req.res , 
                    ...permissions
                ]
            }
        })
    }
}