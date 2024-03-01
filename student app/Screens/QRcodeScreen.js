import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppContainerComp from '../Components/Public/AppContainerComp';
import { ArrowPathIcon } from 'react-native-heroicons/solid';
import ButtonComp from '../Components/Public/ButtonComp';

const QRcodeScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

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

  return (
    <AppContainerComp>
      <View className="h-[500px] mt-10">
        <CameraView  
          facing={facing}
          onBarcodeScanned={e => console.log(e)}
        >
          <View className="h-full w-full">
            <View className="bottom-2 absolute w-full">
              <TouchableOpacity className="bg-mainBlue mx-auto rounded-full p-1" onPress={toggleCameraFacing}>
                <ArrowPathIcon size={40} fill={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    </AppContainerComp>
  );
}

export default QRcodeScreen