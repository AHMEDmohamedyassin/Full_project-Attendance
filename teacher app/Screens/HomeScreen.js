import React from 'react'
import AppContainerComp from '../Components/Public/AppContainerComp'
import { Text, TouchableOpacity, View } from 'react-native'
import SquareCardsComp from '../Components/Home/SquareCardsComp'

const HomeScreen = ({navigation }) => {
  return (
    <AppContainerComp>

      <TouchableOpacity onPress={() => navigation.navigate('Lectures')} className="flex items-center gap-y-4 w-full p-4 rounded-xl bg-slate-50 my-4">
        <Text className="text-4xl font-extrabold text-mainBlue">20</Text>
        <Text className="text-gray-400 font-bold text-lg">محاضرة</Text>
      </TouchableOpacity>

      <View className="w-full h-[1px] bg-slate-400 my-4"></View>

      <SquareCardsComp/>

    </AppContainerComp>
  )
}

export default HomeScreen