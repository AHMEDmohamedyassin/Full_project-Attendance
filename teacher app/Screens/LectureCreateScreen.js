import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import AppContainerComp from '../Components/Public/AppContainerComp'
import InputComp from '../Components/Public/InputComp'
import ButtonComp from '../Components/Public/ButtonComp'

const LectureCreateScreen = () => {

  return (
    <AppContainerComp>
        {/* from  */}
        <View className="flex items-center">
          <InputComp val={() => {}} placeholder={'عنوان المحاضرة'} title={'عنوان المحاضرة'}/>
          <InputComp mode={'numeric'} val={() => {}} placeholder={'عدد أيام إتاحة التسجيل'} title={'عدد أيام إتاحة التسجيل'}/>

          <ButtonComp title={'تأكيد'} onPress={() => {}} />
        </View>
    </AppContainerComp>
  )
}

export default LectureCreateScreen