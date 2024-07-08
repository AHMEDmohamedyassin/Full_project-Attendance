import React, { memo } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

const ButtonComp = ({title , onPress}) => {
  return (
    <TouchableHighlight className="rounded-lg my-2" onPress={onPress}>
        <View className={`bg-mainBlue px-4 py-1 rounded-lg border-gray-200 shadow-sm`}>
            <Text className="text-[#fff] text-lg mx-auto">{title}</Text>
        </View>
    </TouchableHighlight>
  )
}

export default memo(ButtonComp)