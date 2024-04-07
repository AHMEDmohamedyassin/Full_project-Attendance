import React, { useEffect, useState } from 'react'
import {Text, View } from 'react-native'
import AuthContainerComp from '../../Components/Public/AuthContainerComp'
import {SmallLoadingComp} from '../../Components/Public/LoadingComp'
import InputComp from '../../Components/Public/InputComp'
import ButtonComp from '../../Components/Public/ButtonComp'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterAuth } from '../../redux/action/AuthAction'
import { notify } from '../../Components/Public/notification'

const RegisterScreen = ({navigation}) => {
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [data , setData] = useState({})

  const submitHandle = () => {
    const required = ['name' ,'phone' ,'collage_id' ,'sec' ,'bn' ,'code' ,'group' ,'email' ,'password' ,'password_confirmation' ]
    for(const require of required){
      if(!data[require]) return notify('الرجاء إدخال البيانات المطلوبة')
    }

    dispatch(RegisterAuth({...data , is_student : true}))
  }
  return (
    <AuthContainerComp>
      <View className="flex flex-col items-center w-3/4 mx-auto my-10">
        {/* <Text className="text-black font-extrabold text-xl text-mainBlue">إنشاء حساب</Text> */}
        
          <InputComp val={e => setData(old => ({...old , name : e}))} placeholder={'أحمد'}  title={'الاسم'} />
          <InputComp val={e => setData(old => ({...old , phone : e}))} placeholder={'01066404523'}  title={'الهاتف'} />
          <InputComp val={e => setData(old => ({...old , collage_id : e}))} placeholder={'هندسة القاهرة'}  title={'الكلية'} />
          <InputComp val={e => setData(old => ({...old , sec : e}))} placeholder={'2'}  title={'الفصل'} />
          <InputComp val={e => setData(old => ({...old , bn : e}))} placeholder={'4'}  title={'الرقم بالفصل'} />
          <InputComp val={e => setData(old => ({...old , code : e}))} placeholder={'9210150'}  title={'الكود'} />
          <InputComp val={e => setData(old => ({...old , group : e}))} placeholder={'A'}  title={'المجموعة'} />
          <InputComp val={e => setData(old => ({...old , email : e}))} placeholder={'ahmedmohamed982025@outlook.com'}  title={'البريد الإليكتروني'} />
          <InputComp val={e => setData(old => ({...old , password : e}))} placeholder={''}  title={'كلمة المرور'} />
          <InputComp val={e => setData(old => ({...old , password_confirmation : e}))} placeholder={''}  title={'تأكيد كلمة المرور'} />

          {
            state.status == 'rl' ? <View className="my-4"><SmallLoadingComp/></View> : 
            (<>
              <ButtonComp title={'إنشاء حساب'} onPress={submitHandle}/>

              <Text 
                className="mt-2 text-mainBlue"
                onPress={() => navigation.navigate('Login')}
              >تسجيل الدخول ؟</Text>
            </>)
          }
      </View>
    </AuthContainerComp>
  )
}

export default RegisterScreen