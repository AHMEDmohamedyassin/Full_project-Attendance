import React from 'react'
import AppContainerComp from '../Components/Public/AppContainerComp'
import { Text, TouchableOpacity, View } from 'react-native'
import { PlusIcon } from 'react-native-heroicons/solid'
import LectCardComp from '../Components/Lecture/LectCardComp'

const LecturesScreen = ({navigation}) => {
  return (
    <AppContainerComp>

      {/* lecture count and adding lecture button */}
      <View className="flex flex-row justify-between items-center">
        <View className="flex items-center flex-row gap-x-2 my-4 ">
          <Text className="text-gray-400 text-lg">عدد : </Text>
          <Text className="text-gray-400 text-lg">20</Text>
          <Text className="text-gray-400 text-lg">محاضرة</Text>
        </View>

        <TouchableOpacity onPress={() =>navigation.navigate('Create')} className="bg-mainBlue rounded-lg p-1 w-fit">
          <PlusIcon fill={'white'} size={25} />
        </TouchableOpacity>
      </View>

      {/* listing lectures */}
      <View>
        <LectCardComp/>
        <LectCardComp/>
        <LectCardComp/>
        <LectCardComp/>
        <LectCardComp/>
        <LectCardComp/>
        <LectCardComp/>
      </View>

    </AppContainerComp>
  )
}

export default LecturesScreen