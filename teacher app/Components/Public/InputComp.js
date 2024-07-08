import React from 'react'
import { Text, TextInput, View } from 'react-native'

const InputComp = ({val , title , placeholder , defaultVal , mode}) => {
  return (
    <View className="flex flex-col w-full gap-1 my-2">
        <Text className="text-xs text-gray-700">{title}</Text>
        <TextInput 
          inputMode={mode ? mode : 'text'}
          onChangeText={e => val(e)} 
          placeholder={placeholder} 
          className="bg-slate-50 border-[1px] border-gray-300 rounded w-full px-2 py-1"
          defaultValue={defaultVal}
        />
    </View>
  )
}

export default InputComp