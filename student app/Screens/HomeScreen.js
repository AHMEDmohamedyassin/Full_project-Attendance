import React from 'react'
import AppContainerComp from '../Components/Public/AppContainerComp'
import { Text, View } from 'react-native'
import CardComp from '../Components/Home/CardComp'
import SquareCardsComp from '../Components/Home/SquareCardsComp'

const HomeScreen = ({navigation }) => {
  return (
    <AppContainerComp>
      {/* <Text className="font-bold text-lg text-mainBlue text-center my-4">لا يوجد محاضرات تحتاج إلي التسجيل</Text> */}

      <View>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
      </View>

      <View className="w-full h-[1px] bg-slate-400 my-4"></View>

      <SquareCardsComp/>

    </AppContainerComp>
  )
}

export default HomeScreen