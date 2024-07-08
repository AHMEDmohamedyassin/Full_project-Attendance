import React from 'react'
import { Text,View } from 'react-native'
import AppContainerComp from '../Components/Public/AppContainerComp'
import InputComp from '../Components/Public/InputComp'
import ButtonComp from '../Components/Public/ButtonComp'
import QrcodeComp from '../Components/Public/QrcodeComp'

const InfoScreen = () => {
  const qrcodeValue = 'ahmed mohamed yassin'
  return (
    <AppContainerComp>
      <View >

        {/* small qrcode */}
        <View className="flex items-center my-10" >

          <QrcodeComp qrcodeValue={qrcodeValue} />

          <Text className="font-bold text-mainBlue text-xl mt-2">أحمد محمد ياسين</Text>
        </View>

        {/* from  */}
        <View className="flex">
          <InputComp val={() => {}} placeholder={'الاسم'} defaultVal={'أحمد'} title={'الاسم'}/>
          <InputComp val={() => {}} placeholder={'الجامعة'} defaultVal={'القاهرة'} title={'الجامعة'}/>
          <InputComp val={() => {}} placeholder={'الكلية'} defaultVal={'حقوق'} title={'كلية'}/>
        </View>

        <View className="w-20 mx-auto mt-4">
          <ButtonComp onPress={() => {}} title={'حفظ'}/>
        </View>

      </View>
    </AppContainerComp>
  )
}

export default InfoScreen