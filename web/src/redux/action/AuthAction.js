import { notify } from '../../Components/Public/notification'
import { Login_Url, Logout_Url, Register_Url } from '../Url'
import { fetching } from '../fetch'
import {store} from '../store'

const user_data_localstorage = 'user_data_attendance'

/**
 * register function
 */
export const RegisterAuth = (obj) => {
    return async dispatch => {
        store.dispatch({type:'Auth_Status' , data : 'rl'})
        notify('جاري التحميل')

        const req =  await fetching(Register_Url , obj)

        if(!req.success) return store.dispatch({type:'Auth_Status' , data : 'n'})

        notify('تم إنشاء الحساب')
        
        let res = req.res
        let json_data = res.json_data
        delete res.json_data

        // parse json_data string item into object items
        if(json_data){
            res = {
                ...res,
                ...JSON.parse(json_data)
            }
        }

        localStorage.setItem(user_data_localstorage , JSON.stringify(res))

        dispatch({
            type:"Auth_Data",
            data : {
                ...res ,
                status : 'n'
            }
        })
    }
}


/**
 * initial user data 
 */
export const InitiateAuth = () => {
    let data = localStorage.getItem(user_data_localstorage)

    if(!data) return {type:null , data : null}

    data = JSON.parse(data)

    return {
        type:"Auth_Data",
        data
    }
}


/**
 * login
 */
export const LoginAuth = (obj) => {
    return async dispatch => {
        store.dispatch({type:"Auth_Status" , data:'ll'})
        notify('جاري التحميل')

        const req = await fetching(Login_Url , obj)

        if(!req.success) return store.dispatch({type:"Auth_Status" , data:'n'})

        notify('تم تسجيل الدخول')
        
        let res = req.res
        let json_data = res.json_data
        delete res.json_data

        // parse json_data string item into object items
        if(json_data){
            res = {
                ...res,
                ...JSON.parse(json_data)
            }
        }

        localStorage.setItem(user_data_localstorage , JSON.stringify(res))

        dispatch({
            type:"Auth_Data",
            data : {
                ...res ,
                status : 'n'
            }
        })
    }
}


/**
 * logout
 */
export const LogoutAuth = () => {
    return async dispatch => {
        const token = store.getState().Auth?.token

        const req = await fetching(Logout_Url , {token})

        localStorage.removeItem(user_data_localstorage)
        dispatch({
            type : "Auth_Logout"
        })
    }
}