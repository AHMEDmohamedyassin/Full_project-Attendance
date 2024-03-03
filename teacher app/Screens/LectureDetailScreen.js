import React, { useEffect, useState } from 'react'
import AppContainerComp from '../Components/Public/AppContainerComp'
import StuCardComp from '../Components/Lecture/StuCardComp'
import { TouchableOpacity, View } from 'react-native'
import DownloadBtnComp from '../Components/Lecture/DownloadBtnComp'
import QrcodeComp from '../Components/Public/QrcodeComp'
import { CameraIcon } from 'react-native-heroicons/solid'

const LectureDetailScreen = ({navigation}) => {
  const [qrcodeValue , setQrcodeValue] = useState('1')

  useEffect(() => {
    const interval = setInterval(() => {
      setQrcodeValue(prevCount => (parseInt(prevCount) + 1).toString() );
    }, 3000);

    return () => clearInterval(interval);
  }, []); 

  return (
    <AppContainerComp>

      <View className="flex items-center justify-center my-4">
        <QrcodeComp qrcodeValue={qrcodeValue} />
        <TouchableOpacity className="mb-4 bg-gray-100 rounded-full p-1 shadow " onPress={() => navigation.navigate('QR')}>
          <CameraIcon size={30} fill={'gray'}/>
        </TouchableOpacity>
        {/* download button not work*/}
        {/* <DownloadBtnComp/> */}
      </View>

        <View>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
          <StuCardComp/>
        </View>
    </AppContainerComp>
  )
}

export default LectureDetailScreen