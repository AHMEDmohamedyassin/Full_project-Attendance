import React from 'react'
import {Text, View } from 'react-native'
import AuthContainerComp from '../../Components/Public/AuthContainerComp'
import InputComp from '../../Components/Public/InputComp'
import ButtonComp from '../../Components/Public/ButtonComp'

const ForgetPass = ({navigation}) => {
  return (
    <AuthContainerComp>
      <View className="flex flex-col items-center w-3/4 mx-auto my-32">
        <Text className="text-black font-extrabold text-xl text-mainBlue">استعادة الحساب</Text>

          <InputComp val={e => {}}  title={'البريد الإليكتروني'} />

          <ButtonComp title={'تأكيد'} onPress={() => {}}/>

          <Text 
            className="mt-2 text-mainBlue"
            onPress={() => navigation.navigate('Login')}
          >تسجيل الدخول ؟</Text>
      </View>
    </AuthContainerComp>
  )
}

export default ForgetPass