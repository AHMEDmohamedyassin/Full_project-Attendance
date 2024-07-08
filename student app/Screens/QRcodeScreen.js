import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppContainerComp from '../Components/Public/AppContainerComp';
import { ArrowPathIcon } from 'react-native-heroicons/solid';
import ButtonComp from '../Components/Public/ButtonComp';
import { useDispatch, useSelector } from 'react-redux'
import { AttendanceLocallySave } from '../redux/action/StudentAction';

const QRcodeScreen = () => {
  const dispatch = useDispatch()
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [openCamera , setOpenCamera] = useState(false)
  const [scannedData , setScannedData] = useState([])

  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (!permission.granted) {
    return (
      <AppContainerComp>
        <Text className="text-center font-bold text-mainBlue my-10">التطبيق غير مسمحوح له بصلاحية الكاميرا</Text>
        <View className="w-fit mx-auto">
          <ButtonComp title={'طلب صلاحية الكاميرا'} onPress={requestPermission} />
        </View>
      </AppContainerComp>
    ) ;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  // handle scanning
  const scanningHandle = ({data}) => {
    try {
      const object = JSON.parse(data)
  
      
      if(object.end && scannedData.length > 0){
        let data = {}
        let ids = []
        let end = object.id
        scannedData.forEach(element => {
          const obj = JSON.parse(element)
          data.id = obj.lect_id
          if(obj.end) end = obj.id
          else ids.push(obj.id)
        });
        data.qr_code_ids = {
          ids , end
        }
        
        // closing the camera
        setOpenCamera(false)
        setScannedData([])
  
        return dispatch(AttendanceLocallySave(data))      
      }
  
      // saving objects as it is without parsing to save unique values
      setScannedData(scanned => [...new Set([...scanned , data])])

    }catch(e){}
  }

  return (
    <AppContainerComp>
      <View className="h-[500px] mt-10">
        {
          openCamera ? (<>
            <CameraView  
              facing={facing}
              onBarcodeScanned={scanningHandle}
            >
              <View className="h-full w-full">
                <View className="bottom-2 absolute w-full">
                  <TouchableOpacity className="bg-mainBlue mx-auto rounded-full p-1" onPress={toggleCameraFacing}>
                    <ArrowPathIcon size={40} fill={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            </CameraView>
          </>) : (<>
          <View className="w-3/4 mx-auto">
            <ButtonComp title={'تشغيل الكاميرا'} onPress={() => setOpenCamera(true)} />
          </View>
          </>)
        }
      </View>
    </AppContainerComp>
  );
}

export default QRcodeScreen