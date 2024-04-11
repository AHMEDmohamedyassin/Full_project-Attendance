import React , {memo} from 'react'
import { useNavigation} from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'
import { QrCodeIcon, QueueListIcon, UserIcon } from 'react-native-heroicons/solid'

const SquareCardsComp = () => {
  const navigation = useNavigation()
  return (
    <>
      <View className="my-4 flex flex-row flex-wrap justify-between items-center">
        <TouchableOpacity 
            className="w-[45%] flex justify-center items-center aspect-square rounded-lg bg-purple-500" 
            onPress={() => navigation.navigate("Info")}
        >
            <UserIcon size={80} fill={"gray"}/>
        </TouchableOpacity>

        <TouchableOpacity 
            className="w-[45%] flex justify-center items-center aspect-square rounded-lg bg-orange-500" 
            onPress={() => navigation.navigate("QR")}
        >
            <QrCodeIcon size={80} fill={"gray"}/>
        </TouchableOpacity>

      </View>
      <View className="my-4 flex flex-row flex-wrap justify-between items-center">
        <TouchableOpacity 
            className="w-[45%] flex justify-center items-center aspect-square rounded-lg bg-sky-500" 
            onPress={() => navigation.navigate("Recorded")}
        >
            <QueueListIcon size={80} fill={"gray"}/>
        </TouchableOpacity>
        
      </View>
    </>
  )
}

export default memo(SquareCardsComp)