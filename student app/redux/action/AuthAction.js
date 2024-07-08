import { notify } from '../../Components/Public/notification';
import { CollageSearch_Url, ForgetPassword_Url, GetAuthData_Url, Login_Url, Logout_Url, Register_Url, ResetPassword_Url, UpdateAuth_Url } from '../Url'
import { fetching } from '../fetch'
import {store} from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage';

const user_data_localstorage = 'user_data_attendance'

/**
 * register function
 */
export const RegisterAuth = (obj) => {
    return async dispatch => {
        store.dispatch({type:'Auth_Status' , data : 'rl'})

        const req =  await fetching(Register_Url , obj)

        if(!req.success) return store.dispatch({type:'Auth_Status' , data : 'n'})

        
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

        // save data to local storage
        await storeData(res)

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
    return async dispatch => {

        let data = await getData()

        if(!data) return {type : "" , data:null}
    
        dispatch({
            type:"Auth_Data",
            data
        })
    }
}


/**
 * login
 */
export const LoginAuth = (obj) => {
    return async dispatch => {
        store.dispatch({type:"Auth_Status" , data:'ll'})

        const req = await fetching(Login_Url , obj)

        if(!req.success) return store.dispatch({type:"Auth_Status" , data:'n'})

        
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

        // storing data to local storage
        await storeData(res)

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

        // remove data from localstorage
        await removeValue()

        dispatch({
            type : "Auth_Logout"
        })
    }
}


/**
 * search Collage
 */
export const CollageAuth = (obj) => {
    return async dispatch => {
        const token = store.getState().Auth?.token
        
        dispatch({type:"Auth_Status" , data:'cl'})

        const req = await fetching(CollageSearch_Url , {page : 1 , title : '' , ...obj})

        dispatch({type:"Auth_Status" , data:'n'})

        if(!req.success || !req.res.items) return 

        dispatch({
            type : 'Auth_Collage' ,
            data : req.res.items
        })
    }
}


/**
 * update user data
 */
export const UpdateAuth = (obj) => {
    return async dispatch => {
        const token = store.getState().Auth?.token
        dispatch({type:"Auth_Status" , data:'ul'})
        
        const req = await fetching(UpdateAuth_Url , {token , ...obj})
        
        dispatch({type:"Auth_Status" , data:'n'})

        if(!req.success) return

        notify('تم تعديل البيانات '  , 'SUCCESS')

        dispatch(GetUserData())
    }
}


/**
 * get user data
 */
export function GetUserData() {
    return async dispatch => {
        const token = store.getState().Auth?.token
        dispatch({type:"Auth_Status" , data:'gl'})
        
        const req = await fetching(GetAuthData_Url , {token})
        
        dispatch({type:"Auth_Status" , data:'n'})

        if(!req.success || !req.res) return 

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

        // save data to localstorage
        await storeData(res)

        dispatch({
            type:"Auth_Data",
            data : {
                ...req.res ,
                status : 'n'
            }
        })
    }
} 


/**
 * forget password 
 * check email and send verify emial
 */
export const ForgetPassowrdAuth = (email) => {
    return async dispatch => {
        dispatch({type:"Auth_Status" , data:'fl'})
        
        const req = await fetching(ForgetPassword_Url , {email})

        
        if(req.success){
            dispatch({type:"Auth_Status" , data:'fs'})
            notify('تم إرسال رسالة تحقق')
        }
        else
            dispatch({type:"Auth_Status" , data:'n'})
    } 
}


/**
 * reset password
 * get token , email , password , password confirmation
 */
export const ResetPasswordAuth = (obj) => {
    return async dispatch => {
        dispatch({type:"Auth_Status" , data:'pl'})
        
        const req = await fetching(ResetPassword_Url , {...obj})
        
        if(req.success)
            dispatch({type:"Auth_Status" , data:'ps'})
        else 
            dispatch({type:"Auth_Status" , data:'n'})
    }
}


/**
 ***************************************************** 
 ***************************************************** 
 ***************************************************** 
 * store data to local storage 
 * helper function
 */

async function storeData (value) {
    const str = JSON.stringify(value)
    try {
      await AsyncStorage.setItem(user_data_localstorage, str);
    } catch (e) {
      // saving error
    }
};


/**
 * get stored data from local storage
 */
async function getData () {
    try {
      const value = await AsyncStorage.getItem(user_data_localstorage);
      if (value !== null) {
        return JSON.parse(value)
      }
      return false
    } catch (e) {
      return false
    }
};


/**
 * remove stored data from local storage
 */
async function removeValue () {
    try {
      await AsyncStorage.removeItem(user_data_localstorage)
    } catch(e) {
      // remove error
    }
}