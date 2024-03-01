import React from 'react'
import { View , StatusBar, Text, ScrollView} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AuthContainerComp = ({children}) => {
  return (
    <SafeAreaProvider>
      <ScrollView className="bg-white">
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

export default AuthContainerComp