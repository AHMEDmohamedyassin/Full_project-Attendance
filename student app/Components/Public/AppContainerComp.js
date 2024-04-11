import React, { memo, useState } from 'react'
import { View , ScrollView, RefreshControl} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch , useSelector} from 'react-redux'
import { useNavigation, useNavigationState } from '@react-navigation/native';

const AppContainerComp = ({children}) => {
  const dispatch = useDispatch()
  const [refreshing , setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)

    dispatch({type:"Setting_Reload" , data : 'l'})

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

    const getCurrentRouteName = () => {
        const route = useNavigationState(state => state?.routes[state.index] ? state?.routes[state.index] : {name:Auth.token ? 'Home' : 'Login'});
        return route.name;
    };

  return (
    <SafeAreaProvider>
      <ScrollView 
        className="bg-slate-200"
        refreshControl={
          ['Recorded' , 'Info'].includes(getCurrentRouteName())? 
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          :null
        }
      >
        <View className="flex-1 pb-16 bg-transparent px-4">
            {children}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default memo(AppContainerComp)