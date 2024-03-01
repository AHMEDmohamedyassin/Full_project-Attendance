import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Keyboard, View} from 'react-native'
import { ArrowPathIcon, HomeIcon, PlusIcon, QueueListIcon, UserIcon } from "react-native-heroicons/solid";
import * as tailwind from '../../tailwind.config'

const NavBar = () => {
    const navigation = useNavigation()
    
    
    const getCurrentRouteName = () => {
        const route = useNavigationState(state => state?.routes[state.index] ? state?.routes[state.index] : {name:'Login'});
        return route.name;
    };

    let currentRouteName = getCurrentRouteName();
    const mainBlue = tailwind.theme.extend.colors.mainBlue
    const blurColor = 'gray'


    // check if keyboard is open or not
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setIsKeyboardOpen(true);
        }
      );
  
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setIsKeyboardOpen(false);
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    return (
        <>
            {
                ["Home" ,"Info" ,"Lectures" ,"Create" ,"Details" , "QR" , "Excel"].findIndex(e => e == currentRouteName) >= 0 && !isKeyboardOpen ? (

                    <View className="absolute bottom-4 w-full">
                        <View className="bg-slate-100 px-2 py-2  rounded flex flex-row justify-around w-3/4 mx-auto">
                            <HomeIcon onPress={() => navigation.navigate('Home')} fill={currentRouteName == "Home" ? mainBlue : blurColor} size={20} />
                            <UserIcon onPress={() => navigation.navigate('Info')} fill={currentRouteName == "Info" ? mainBlue : blurColor} size={20} />
                            <QueueListIcon onPress={() => navigation.navigate('Lectures')} fill={currentRouteName == "Lectures" ? mainBlue : blurColor} size={20} />
                            <PlusIcon onPress={() => navigation.navigate('Create')} fill={currentRouteName == "Create" ? mainBlue : blurColor} size={20} />
                            <ArrowPathIcon onPress={() => navigation.navigate('Details')} fill={currentRouteName == "Details" ? mainBlue : blurColor} size={20} />
                            <ArrowPathIcon onPress={() => navigation.navigate('Excel')} fill={currentRouteName == "Excel" ? mainBlue : blurColor} size={20} />
                        </View>
                    </View>

                ) : null
            }
        </>
    )
}

export default NavBar