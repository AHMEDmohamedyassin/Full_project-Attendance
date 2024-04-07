import React, { useEffect, useState } from 'react'
import {Text, View } from 'react-native'
import AuthContainerComp from '../../Components/Public/AuthContainerComp'
import InputComp from '../../Components/Public/InputComp'
import ButtonComp from '../../Components/Public/ButtonComp'
import { useDispatch, useSelector } from 'react-redux'
import { LoginAuth } from '../../redux/action/AuthAction'
import { SmallLoadingComp } from '../../Components/Public/LoadingComp'
import { notify } from '../../Components/Public/notification'

const LoginScreen = ({navigation}) => {
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [data , setData] = useState({email: "" , password:""})
  
  const submitHandle = () => {
    const required = ['email' , 'password']
    for(const require of required){
      if(!data[require]) return notify('الرجاء إدخال البيانات المطلوبة')
    }
    dispatch(LoginAuth(data))
  } 
  return (
    <AuthContainerComp>
      <View className="flex flex-col items-center w-3/4 mx-auto my-32">
        {/* <Text className="text-black font-extrabold text-xl text-mainBlue">تسجيل الدخول</Text> */}

          <InputComp val={e => setData(old => ({...old , email : e}))} placeholder={'البريد الإليكتروني'}  title={'البريد الإليكتروني'} />
          <InputComp val={e => setData(old => ({...old , password : e}))} placeholder={'كلمة المرور'}  title={'كلمة المرور'} />

          {
            state.status == 'll' ? <View className="my-4"><SmallLoadingComp/></View> 
            :  
            (
              <>
                <ButtonComp title={'تسجيل الدخول'} onPress={() => submitHandle()}/>
                <Text 
                  className="mt-2 text-mainBlue"
                  onPress={() => navigation.navigate('Register')}
                >إنشاء حساب ؟</Text>
      
                <Text 
                  className="mt-2 text-mainBlue"
                  onPress={() => navigation.navigate('ForgetPass')}
                >نسيت كلمة المرور ؟</Text>
              </>
            )
          }


      </View>
    </AuthContainerComp>
  )
}

export default LoginScreen