import { APIv, APP_URL, PRODUCTION } from "./Url";
import { msgs } from './Msg';
import { notify } from '../Components/Public/notification';
import { store } from './store';

export const fetching = async (url , data = {} , body = null , headers = null) => {
    
    // assigning default body and headers
    if(!body)
        body = JSON.stringify(data)
    if(!headers) 
        headers = {
            'Content-Type' : 'application/json',
        }

    try{
        const req = await fetch(`${APP_URL}${APIv}${url}` , {
            method:'POST',
            headers,
            body
        });
    
        if(!PRODUCTION)
            console.log(req)
        
        if(!req.ok){
            notify('حدثت مشكلة ما الرجاء المحاولة لاحقا')
            return {success : false , res : {}}
        }
    
        const res = await req.json();
    
        if(res?.success){
            return {success:true , res:res.response}
        }else if (res.msg_code == 5){
            store.dispatch({type:'Auth_Logout'})
            return {success : false , res:{}}
        }
    
        notify(res.msg_code && msgs[res.msg_code]? msgs[res.msg_code]["ar"] : 'حدث خطأ ما')
    
        if(!PRODUCTION)
            console.log(res)
    
        return {success : false , res};
        
    }catch(e){
        return {success : false , res:{}};
    }
}