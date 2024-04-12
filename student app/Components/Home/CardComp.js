import React, { useEffect, useState , memo} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {AttendanceAuto} from '../../redux/action/StudentAction'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/solid'
import {SmallLoadingComp} from '../Public/LoadingComp'

const CardComp = ({date , data}) => {
  const state = useSelector(state => state.Stud)
  const dispatch = useDispatch()
  const [dateObj , setDateObj] = useState({})

  // time formate handle
  useEffect(() => {
    if(!date) return 
      const d = new Date(date)
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
} , [])


  const handleSubmit = () => {
    // return console.log({...data , app_att_created_at : new Date(date).toUTCString()})
    dispatch(AttendanceAuto({...data , app_att_created_at : new Date(date).toUTCString()}))
  }
  return (
        <View className="bg-slate-50 flex rounded-xl p-4 w-full my-2">

            {/* lecture title */}
            <View className="border-b-[1px] border-gray-200 pb-3 mb-3 flex flex-row px-1">
                <View className="h-6 w-[3px] bg-mainBlue rounded"></View>
                <View className="flex flex-row justify-between items-center w-full">
                  {/* lecture id */}
                  <Text className="px-2">{data.id}</Text>
                  {/* submit button */}
                  {
                    state.status == `c${data.id}l` ? <View className="h-6 w-16 flex items-center"><SmallLoadingComp/></View> :
                      <TouchableOpacity onPress={handleSubmit} className="bg-white border-gray-200 border-[2px] p-1 rounded-xl shadow-xs shadow-gray-100 -my-1">
                        <Text Text className="text-mainBlue px-4">تسجيل</Text>
                      </TouchableOpacity>
                  }
                </View>
            </View>

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