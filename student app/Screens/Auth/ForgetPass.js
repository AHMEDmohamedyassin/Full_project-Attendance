import React, { useEffect, useState } from 'react'
import {Text, View } from 'react-native'
import AuthContainerComp from '../../Components/Public/AuthContainerComp'
import InputComp from '../../Components/Public/InputComp'
import ButtonComp from '../../Components/Public/ButtonComp'
import {SmallLoadingComp} from '../../Components/Public/LoadingComp'
import { useDispatch, useSelector } from 'react-redux'
import { ForgetPassowrdAuth } from '../../redux/action/AuthAction'
import { notify } from '../../Components/Public/notification'

const ForgetPass = ({navigation}) => {
  const state = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [data , setData] = useState({email : ""})
  const [sec , setSec] = useState(0)

  const submitHandle = () => {
    const required = ['email']
    for(const require of required){
      if(!data[require]) return notify('الرجاء إدخال البيانات المطلوبة')
    }

    dispatch(ForgetPassowrdAuth(data.email))
  }

  // counter 
  useEffect(() => {
    const interval = setInterval(() => {
      setSec(old => old - 1)
    } , 1000)

    return () => clearInterval(interval)
  } , [])

  useEffect(() => {
    if(state.status == 'fs'){
      dispatch({type:"Auth_Status" , data:'n'})
      setSec(60)
    }
  } , [state.status])
  return (
    <AuthContainerComp>
      <View className="flex flex-col items-center w-3/4 mx-auto my-32">
        {/* <Text className="text-black font-extrabold text-xl text-mainBlue">استعادة الحساب</Text> */}

          <InputComp val={e => setData(old => ({...old , email : e}))} placeholder={'ahmed@gmail.com'}  title={'البريد الإليكتروني'} />

          {
            state.status == 'fl' ? <View className="my-4"><SmallLoadingComp/></View>
            : sec > 0 ? <Text className="text-mainBlue my-4 bg-mainWhite rounded-full  p-2">{sec}</Text>:(<>
              <ButtonComp title={'تأكيد'} onPress={submitHandle}/>

              <Text 
                className="mt-2 text-mainBlue"
                onPress={() => navigation.navigate('Login')}
              >تسجيل الدخول ؟</Text>
            </>)
          }
      </View>
    </AuthContainerComp>
  )
}

export default ForgetPass