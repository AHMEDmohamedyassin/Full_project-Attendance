import React, { memo } from 'react'
import { View , StatusBar, Text, ScrollView} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

const AuthContainerComp = ({children}) => {
  const state = useSelector(state => state.Set)
  const dispatch = useDispatch()

  return (
    <SafeAreaProvider>
      <ScrollView scrollEnabled={state.scroll} className="bg-white">
        <View className="flex-1 bg-white pb-10">
            <StatusBar 
                animated={true}
                backgroundColor="#999999"
            />       

            {children}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default memo(AuthContainerComp)