import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AppContainerComp from '../Components/Public/AppContainerComp'
import QRCode from 'react-qr-code'
import InputComp from '../Components/Public/InputComp'
import ButtonComp from '../Components/Public/ButtonComp'
import QrcodeComp from '../Components/Public/QrcodeComp'

const InfoScreen = () => {
  const qrcodeValue = 'ahmed '
  return (
    <AppContainerComp>
      <View>

        {/* small qrcode */}
        <View className="flex items-center my-10" >

          <QrcodeComp qrcodeValue={qrcodeValue} />

          <Text className="font-bold text-mainBlue text-xl">أحمد محمد ياسين</Text>
        </View>

        {/* from  */}
        <View className="flex">
          <InputComp val={() => {}} defaultVal={'أحمد'} title={'الاسم'}/>
          <InputComp val={() => {}} defaultVal={'2'} title={'الفصل'}/>
          <InputComp val={() => {}} defaultVal={'4'} title={'الرقم في الفصل'}/>
          <InputComp val={() => {}} defaultVal={'9210150'} title={'الكود'}/>
        </View>

        <View className="w-20 mx-auto mt-4">
          <ButtonComp onPress={() => {}} title={'تأكيد'}/>
        </View>

      </View>
    </AppContainerComp>
  )
}

export default InfoScreen