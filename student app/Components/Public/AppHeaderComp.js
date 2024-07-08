import { useNavigationState } from '@react-navigation/native';
import React, { memo } from 'react'
import {StatusBar, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

const AppHeaderComp = () => {
  const Auth = useSelector(state => state.Auth)
  const translate_routes = [
    {ar:"الرئيسية" , en:"Home"},
    {ar:"تسجيل الدخول" , en:"Login"},
    {ar:"إنشاء حساب" , en:"Register"},
    {ar:"استعادة الحساب" , en:"ForgetPass"},
    {ar:"البيانات الشخصية" , en:"Info"},
    {ar:"إلتقات رمز" , en:"QR"},
    {ar:"المحاضرات المسجلة" , en:"Recorded"},
  ]
  const getCurrentRouteName = () => {
    const route = useNavigationState(state => state?.routes[state.index] ? state?.routes[state.index] : {name:Auth.token ? 'Home' : 'Login'});
    const obj = translate_routes.find(e => e.en == route.name)
    return obj? obj.ar : route.name;
  };

  let currentRouteName = getCurrentRouteName();
  
  return (
    <View className=" bg-slate-100 py-1">
        <StatusBar animated={true} backgroundColor="#999999"/>       
        <Text className="mx-auto font-bold text-lg">{currentRouteName}</Text>
    </View>
  )
}

export default memo(AppHeaderComp)