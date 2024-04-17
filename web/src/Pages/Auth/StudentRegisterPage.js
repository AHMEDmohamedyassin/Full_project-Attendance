import React, { useEffect } from 'react'
import InputComp from '../../Components/Form/InputComp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterAuth } from '../../redux/action/AuthAction'
import { SmallLoaderComp } from '../../Components/Public/LoaderComp'
import SearchBarComp from '../../Components/Public/SearchBarComp'
import { notify } from '../../Components/Public/notification'

const StudentRegisterPage = () => {
    const state = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandle = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        if(form.get('password').length < 8 ||  form.get('password_confirmation').length < 8) return notify('كلمة المرور يجب أن تكون أكبر من 8 عناصر')
        if(form.get('password') != form.get('password_confirmation')) return notify('كلمة المرور غير متطابقة')


        let obj = {
            is_student : true ,
            collage_id : form.get('search')
        }

        form.delete('search')

        for (const pair of form.entries()) {
            obj[pair[0]] = pair[1]
        }

        dispatch(RegisterAuth(obj))
    }

    useEffect(() => {
        if(state.status == 'rs'){
            dispatch({type:'Auth_Status' , data : 'n'})
            navigate('/')
        }
    } , [state])

    return (
        <form onSubmit={submitHandle} className='contain pt-10 pb-32'>

            <div className='mainFrom'>
                <InputComp required={true} name={'name'} placeholder={'أحمد محمد'} title={'الاسم'}/>
                <InputComp required={true} name={'phone'} placeholder={'01066404523'} title={'رقم الهاتف'}/>
                {/* <InputComp required={true} name={'collage_id'} title={'الكلية'}/> */}
                <SearchBarComp/>
                <InputComp required={true} name={'sec'} placeholder={'2'} title={'الفصل'}/>
                <InputComp required={true} name={'bn'} placeholder={'4'} title={'الرقم بالفصل'}/>
                <InputComp required={true} name={'group'} placeholder={'A'} title={'المجموعة'}/>
                <InputComp required={true} name={'code'} placeholder={'9210150'} title={'الكود'}/>
                <InputComp required={true} name={'email'} placeholder={'ahmed@gmail.com'} title={'البريد الإليكتروني'}/>
                <InputComp required={true} type={'password'} placeholder={''} name={'password'} title={'كلمة الرور'}/>
                <InputComp required={true} type={'password'} placeholder={''} name={'password_confirmation'} title={'تأكيد كلمة المرور'}/>
            </div>
            
            <div className='w-full center flex-col gap-1'>
                {
                    state.status == 'rl' ? <span><SmallLoaderComp/></span> : 
                    <button className='mainButton'>إنشاء حساب</button>
                }
                <Link className='button text-gray-500' to={'/auth/login'}>تسجيل الدخول ؟</Link>
                <Link className='button text-gray-500' to={'/auth/register/instructor'}>إنشاء حساب محاضر ؟</Link>
            </div>
        </form>
      )
}

export default StudentRegisterPage