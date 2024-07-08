import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CalendarIcon, ClockIcon, XMarkIcon } from 'react-native-heroicons/solid'

const StuCardComp = () => {
  return (
        <View className="bg-slate-50 flex rounded-xl p-4 w-full my-2">

            {/* lecture title */}
            <View className="border-b-[1px] border-gray-200 pb-3 mb-3 flex flex-row justify-between">
                <View className="flex flex-row items-center gap-x-2">
                    <View className="h-full w-[3px] bg-mainBlue rounded"></View>
                    <Text className="">أحمد محمد </Text>
                </View>
                <TouchableOpacity onPress={() => {}} className="bg-red-600 rounded p-[1px]">
                    <XMarkIcon size={20} fill={'white'} />
                </TouchableOpacity>
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
        </View>
  )
}

export default StuCardComp