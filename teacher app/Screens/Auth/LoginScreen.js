import React from 'react'
import {Text, View } from 'react-native'
import AuthContainerComp from '../../Components/Public/AuthContainerComp'
import InputComp from '../../Components/Public/InputComp'
import ButtonComp from '../../Components/Public/ButtonComp'

const LoginScreen = ({navigation}) => {
  return (
    <AuthContainerComp>
      <View className="flex flex-col items-center w-3/4 mx-auto my-32">
        <Text className="text-black font-extrabold text-xl text-mainBlue">تسجيل الدخول</Text>

          <InputComp val={e => {}}  title={'البريد الإليكتروني'} />
          <InputComp val={e => {}}  title={'كلمة المرور'} />

          <ButtonComp title={'تسجيل الدخول'} onPress={() => navigation.navigate('Home')}/>

          <Text 
            className="mt-2 text-mainBlue"
            onPress={() => navigation.navigate('Register')}
          >إنشاء حساب ؟</Text>

          <Text 
            className="mt-2 text-mainBlue"
            onPress={() => navigation.navigate('ForgetPass')}
          >نسيت كلمة المرور ؟</Text>
      </View>
    </AuthContainerComp>
  )
}

export default LoginScreen