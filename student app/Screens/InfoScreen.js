import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AppContainerComp from '../Components/Public/AppContainerComp'
import QRCode from 'react-qr-code'
import InputComp from '../Components/Public/InputComp'
import ButtonComp from '../Components/Public/ButtonComp'
import QrcodeComp from '../Components/Public/QrcodeComp'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserData, LogoutAuth , UpdateAuth} from '../redux/action/AuthAction'
import {SmallLoadingComp} from '../Components/Public/LoadingComp'
import SearchCollageComp from '../Components/Public/SearchCollageComp'

const InfoScreen = () => {
  const state = useSelector(state => state.Auth)
  const Set = useSelector(state => state.Set)
  const dispatch = useDispatch()
  const [data , setData] = useState({})

  // logout
  const logoutHandle = () => {
    dispatch(LogoutAuth())
  }

  // update data
  const updateHandle = () => {
    dispatch(UpdateAuth({
      name : state.name ,
      phone : state.phone ,
      sec : state.sec ,
      bn : state.bn ,
      code : state.code ,
      group : state.group ,
      ...data
    }))
  }

  // check if page reloaded
  useEffect(() => {
    if(Set.status == 'l') {
      dispatch({type:"Setting_Reload" , data : 'n'})
      dispatch(GetUserData())
    }
  } , [Set.status])

  return (
    <AppContainerComp>
      <View>

        {/* small qrcode */}
        <View className="flex items-center my-10" >

          <QrcodeComp qrcodeValue={String(state.id)} />

          <Text className="font-bold text-mainBlue text-xl"> الكود : {state.id}</Text>
        </View>

        {/* from  */}
        <View className="flex">
          <InputComp val={(e) => setData(old => ({...old , name : e}))} defaultVal={state.name} title={'الاسم'}/>
          <InputComp val={(e) => setData(old => ({...old , phone : e}))} defaultVal={state.phone} title={'رقم الهاتف'}/>
          <SearchCollageComp val={(e) => setData(old => ({...old , collage_id : e}))}/>
          <InputComp val={(e) => setData(old => ({...old , sec : e}))} defaultVal={state.sec} title={'الفصل'}/>
          <InputComp val={(e) => setData(old => ({...old , bn : e}))} defaultVal={state.bn} title={'الرقم في الفصل'}/>
          <InputComp val={(e) => setData(old => ({...old , code : e}))} defaultVal={state.code} title={'الكود الجامعي'}/>
          <InputComp val={(e) => setData(old => ({...old , group : e}))} defaultVal={state.group} title={'المجموعة'}/>
        </View>

        {
          state.status == 'ul' ? <View className="my-4"><SmallLoadingComp/></View>  : 
          (<>
            <View className="w-20 mx-auto mt-4">
              <ButtonComp onPress={updateHandle} title={'تأكيد'}/>
            </View>

            <View className="mx-auto my-4">
              <TouchableOpacity onPress={() => logoutHandle()}>
                <Text className="text-red-600 font-bold">تسجيل الخروج</Text>
              </TouchableOpacity>
            </View>
          </>)
        }

      </View>
    </AppContainerComp>
  )
}

export default InfoScreen