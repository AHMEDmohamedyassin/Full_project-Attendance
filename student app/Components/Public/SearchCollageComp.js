import React, { memo, useState } from 'react'
import { Modal, ScrollView, Text, View } from 'react-native'
import InputComp from './InputComp'
import ButtonComp from './ButtonComp'
import { useDispatch, useSelector } from 'react-redux'
import { CollageAuth } from '../../redux/action/AuthAction'

const SearchCollageComp = ({val}) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.Auth)
    const [visible , setVisible] = useState(false)
    const [showVal , setShowVal] = useState('')

    const handlePress = (obj) => {
        val(obj.key)
        setShowVal(obj.value)
        setVisible(false)
    } 
    
    const searchHandle = (e) => {
        if(e)
            dispatch(CollageAuth({title : e}))
    }

    return (
    <View className="w-full relative">
        <InputComp onPress={() => setVisible(true)} focusable={false} val={e => {}} defaultVal={showVal} placeholder={'هندسة القاهرة'}  title={'الكلية'} />

        <Modal 
            visible={visible}
            transparent={true}
        >
            <View className="flex items-center h-full w-full bg-white pt-20">

                <View className="w-3/4 bg-white relative">
                    <InputComp val={searchHandle} autoFocus={true} defaultVal={showVal} placeholder={'هندسة القاهرة'}  title={'الكلية'} />
                    
                    <ScrollView className="max-h-[210px] border-gray-200 border-[1px] rounded">
                        {
                            state.collage_list.map((e , index) => 
                                <Text key={index} onPress={() => handlePress({key : e.id , value : e.ar_name})} className="p-2 border-[1px] border-gray-200">{e.ar_name}</Text>
                            )
                        }
                    </ScrollView>
                    
                    <View className="w-2/4 mx-auto my-2">
                        <ButtonComp title={'إلغاء'} onPress={() => setVisible(false)} />
                    </View>
                </View>

            </View>

        </Modal>
    </View>
    )
}

export default memo(SearchCollageComp)