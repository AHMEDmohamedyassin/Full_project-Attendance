import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import QRCode from 'react-qr-code';

const QrcodeComp = ({qrcodeValue}) => {
  const [showQr , setShowQr] = useState(false)
  return (
    <View className="w-full flex flex-row justify-center items-center">
        <TouchableOpacity style={{opacity:showQr ? 0.1 : 1}} onPressIn={() => setShowQr(true)} className="mb-4" onPress={() => {}}>
          <QRCode value={qrcodeValue} size={100} />
        </TouchableOpacity>

        {/* large qr code */}
        {
          showQr ? (
            <TouchableOpacity onPress={() => setShowQr(false)} className="z-50 absolute top-20 bg-gray-100 flex items-center w-full py-4 px-2 rounded-xl shadow-2xl shadow-gray-400 ">
                <QRCode value={qrcodeValue} size={300} />
            </TouchableOpacity>
          ) : null
        }
    </View>
  )
}

export default QrcodeComp