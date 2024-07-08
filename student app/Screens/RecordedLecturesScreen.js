import React, { useEffect } from 'react'
import AppContainerComp from '../Components/Public/AppContainerComp'
import CardComp from '../Components/RecordedScreen/CardComp'
import { useDispatch, useSelector } from 'react-redux'
import { AttendanceStudent } from '../redux/action/StudentAction'
import ButtonComp from '../Components/Public/ButtonComp'
import {SmallLoadingComp} from '../Components/Public/LoadingComp'
import { Text, View } from 'react-native'
import { ToggleStatusSetting } from '../redux/action/SettingAction'

const RecordedLecturesScreen = () => {
  const state = useSelector(state => state.Stud)
  const Set = useSelector(state => state.Set)
  const dispatch = useDispatch()

  const handleLoadMore = () => {
    dispatch(AttendanceStudent({page : state.current + 1}))
  }


  // check if page reloaded
  useEffect(() => {
    if(Set.status == 'l' || state.current < 1) {
      dispatch({type:"Setting_Reload" , data : 'n'})
      dispatch(AttendanceStudent())
    }
  } , [Set.status])
  return (
    <AppContainerComp>
      {
        state.items.map((e , index) => <CardComp key={index} data={e} />)
      }

      {
        !state.items?.length ? <Text className="text-red-500 mx-auto mt-10">لا يوجد بيانات متاحة</Text> : null 
      }

      {
        state.hasMore ? (
          <>
            {
              state.status == 'al' ? <SmallLoadingComp/> : 
                <View className="w-2/4 mx-auto">
                  <ButtonComp title={'المزيد'} onPress={handleLoadMore} />
                </View>
            }
          </>
        ) : null
      }

    </AppContainerComp>
  )
}

export default RecordedLecturesScreen