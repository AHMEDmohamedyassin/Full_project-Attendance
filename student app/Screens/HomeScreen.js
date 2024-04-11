import React from 'react'
import AppContainerComp from '../Components/Public/AppContainerComp'
import { Text, View } from 'react-native'
import CardComp from '../Components/Home/CardComp'
import SquareCardsComp from '../Components/Home/SquareCardsComp'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = ({navigation }) => {
  const state = useSelector(state => state.Stud)
  const dispatch = useDispatch()
  return (
    <AppContainerComp>
      {/* <Text className="font-bold text-lg text-mainBlue text-center my-4">لا يوجد محاضرات تحتاج إلي التسجيل</Text> */}

      <View>
        {
          state.stored_lectures.map((e ,index ) => <CardComp key={index} data={e.data} date={e.date}/>) 
        }
      </View>

      {
        state.stored_lectures.length ? 
          <View className="w-full h-[1px] bg-slate-400 my-4"></View>
        : null
      }

      <SquareCardsComp/>

    </AppContainerComp>
  )
}

export default HomeScreen