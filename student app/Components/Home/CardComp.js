import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CalendarIcon, CheckIcon, ClockIcon, XMarkIcon } from 'react-native-heroicons/solid'

const CardComp = () => {
  return (
        <View className="bg-slate-50 flex rounded-xl p-4 w-full my-2">

            {/* lecture title */}
            <View className="border-b-[1px] border-gray-200 pb-3 mb-3 flex flex-row gap-x-2">
                <View className="h-full w-[3px] bg-mainBlue rounded"></View>
                <Text className="">محاضرة ميكانيكا الإنشاءات</Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              <TouchableOpacity onPress={() => {}} className="bg-white border-gray-200 border-[2px] p-1 rounded-xl shadow-xs shadow-gray-100">
                <Text className="text-mainBlue px-4">تسجيل</Text>
                {/* <CheckIcon fill={"blue"} size={25}/> */}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} className="bg-white border-gray-200 border-[2px] p-1 rounded-xl shadow-xs shadow-gray-100">
                <Text className="text-red-600 px-4">إلغاء</Text>
              </TouchableOpacity>
            </View>
        </View>
  )
}

export default CardComp