import React from 'react'
import { View , ScrollView} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AppContainerComp = ({children}) => {
  return (
    <SafeAreaProvider>
      <ScrollView className="bg-slate-200">
        <View className="flex-1 pb-16 bg-transparent px-4">

            {children}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default AppContainerComp