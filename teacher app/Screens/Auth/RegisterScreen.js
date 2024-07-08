import React from 'react'
import {Text, View } from 'react-native'
import AuthContainerComp from '../../Components/Public/AuthContainerComp'
import InputComp from '../../Components/Public/InputComp'
import ButtonComp from '../../Components/Public/ButtonComp'

const RegisterScreen = ({navigation}) => {
  return (
    <AuthContainerComp>
      <View className="flex flex-col items-center w-3/4 mx-auto my-10">
        <Text className="text-black font-extrabold text-xl text-mainBlue">إنشاء حساب</Text>
        
          <InputComp val={e => {}}  title={'الاسم'} />
          <InputComp val={e => {}}  title={'الفصل'} />
          <InputComp val={e => {}}  title={'الرقم بالفصل'} />
          <InputComp val={e => {}}  title={'الكود'} />
          <InputComp val={e => {}}  title={'البريد الإليكتروني'} />
          <InputComp val={e => {}}  title={'كلمة المرور'} />
          <InputComp val={e => {}}  title={'تأكيد كلمة المرور'} />

          <ButtonComp title={'إنشاء حساب'} onPress={() => {}}/>

          <Text 
            className="mt-2 text-mainBlue"
            onPress={() => navigation.navigate('Login')}
          >تسجيل الدخول ؟</Text>
      </View>
    </AuthContainerComp>
  )
}

export default RegisterScreen