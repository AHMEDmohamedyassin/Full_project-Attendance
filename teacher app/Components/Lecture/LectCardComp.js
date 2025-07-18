import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/solid'

const LectCardComp = () => {
  return (
        <TouchableOpacity onPress={() => {}} className="bg-slate-50 flex rounded-xl p-4 w-full my-2">

            {/* lecture title */}
            <View className="border-b-[1px] border-gray-200 pb-3 mb-3 flex flex-row gap-x-2">
                <View className="h-full w-[3px] bg-mainBlue rounded"></View>
                <Text className="">محاضرة ميكانيكا الإنشاءات</Text>
            </View>

            {/* date details */}
            <View className="flex flex-row justify-between">
                {/* date */}
                <View className="flex flex-row gap-2 items-center">
                    <CalendarIcon fill={'gray'} size={16}/>
                    <Text className="text-xs text-gray-500">20 / 3 / 2024</Text>
                </View>

                {/* time  */}
                <View className="flex flex-row gap-2 items-center">
                    <ClockIcon fill={'gray'} size={16}/>
                    <Text className="text-xs text-gray-500">20 / 3 / 2024</Text>
                </View>
            </View>
        </TouchableOpacity>
  )
}

export default LectCardComp