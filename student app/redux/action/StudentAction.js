import { notify } from '../../Components/Public/notification'
import { AutoAttendance_Url, StudentAttendance_Url } from '../Url'
import {fetching} from '../fetch'
import { store } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage';


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



/**
 * initiate saved lectures and add new lectures to localstorage
 */
export const AttendanceLocallySave = (obj = null) => {
    return async dispatch => {
        let saved_lectures = store.getState()?.Stud?.stored_lectures

        if(!saved_lectures) return 

        
        try{
            if(saved_lectures.find(e => e.data.id == obj.id)) {
                return notify('محاضرة متكررة')
            } 

            saved_lectures = [{data : obj , date : new Date()} , ...saved_lectures]
            await AsyncStorage.setItem('Lectures_saved', JSON.stringify(saved_lectures));
            
            notify('تم حفظ المحاضرة'  , 'SUCCESS')

            dispatch({
                type : "Student_Data" ,
                data : {
                    stored_lectures : saved_lectures
                }
            })
        }catch(e) {
            notify('حدثت مشكلة ما')
            console.log(e)
        }
    }
}


/**
 * initiate saved lectures attendances
 */
export const AttendanceLocallyInitiate = () => {
    return async dispatch => {

        let saved_lectures = []
        try{
            let str_data = await AsyncStorage.getItem('Lectures_saved');
            if(str_data){
                saved_lectures = JSON.parse(str_data)

                let ids = []
                saved_lectures = saved_lectures.filter(obj => {
                   let id = obj.data?.id
                   if(!id) return false 
                   if(ids.includes(id)) return false
                   ids.push(id)
                   return true
                })

                console.log(ids , saved_lectures)
            }

        }catch(e) {
            console.log(e)
        }

        dispatch({
            type : "Student_Data" ,
            data : {
                stored_lectures : saved_lectures
            }
        })
    }
}
