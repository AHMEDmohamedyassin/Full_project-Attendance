import React, { memo, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/solid'

const CardComp = ({data}) => {
    const [dateObj , setDateObj] = useState({})

    // time formate handle
    useEffect(() => {
        if(!data?.pivot?.created_at) return 
          const d = new Date(data.pivot.created_at)
          let hour = d.getHours()
          let PmAm = 'PM'
          let obj = {
            day : d.getDate().toString().padStart(2, '0') ,
            month : (d.getMonth() + 1).toString().padStart(2, '0'),
            year : d.getFullYear(),
            minute : d.getMinutes().toString().padStart(2, '0')
          }
        if(hour < 12) PmAm = 'AM'
        if(hour > 12) hour = hour - 12
        setDateObj({...obj , PmAm , hour : hour.toString().padStart(2, '0')})
    } , [data])
  return (
        <View className="bg-slate-50 flex rounded-xl p-4 w-full my-2">

            {/* lecture title */}
            <View className="border-b-[1px] border-gray-200 pb-3 mb-3 flex flex-row gap-x-2">
                <View className="h-full w-[3px] bg-mainBlue rounded"></View>
                <Text className="">{data.id.toString()}</Text> 
                <View className=""><Text>-</Text></View>
                <Text className="">{data.title}</Text>
            </View>

            {/* date details */}
            <View className="flex flex-row justify-between">
                {/* date */}
                <View className="flex flex-row gap-2 items-center">
                    <CalendarIcon fill={'gray'} size={16}/>
                    <Text className="text-xs text-gray-500">{dateObj.day} / {dateObj.month} / {dateObj.year}</Text>
                </View>

                {/* time  */}
                <View className="flex flex-row gap-2 items-center">
                    <ClockIcon fill={'gray'} size={16}/>
                    <Text className="text-xs text-gray-500">{dateObj.hour} : {dateObj.minute} {dateObj.PmAm}</Text>
                </View>
            </View>
        </View>
  )
}

export default memo(CardComp)