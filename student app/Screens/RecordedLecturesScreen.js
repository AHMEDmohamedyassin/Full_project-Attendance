import React from 'react'
import {View , Text, FlatList} from 'react-native'
import AppContainerComp from '../Components/Public/AppContainerComp'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/solid'
import CardComp from '../Components/RecordedScreen/CardComp'

const RecordedLecturesScreen = () => {
  return (
    <AppContainerComp>
      <CardComp/>
      <CardComp/>
      <CardComp/>
      <CardComp/>
      <CardComp/>
      <CardComp/>
      <CardComp/>
      <CardComp/>

    </AppContainerComp>
  )
}

export default RecordedLecturesScreen