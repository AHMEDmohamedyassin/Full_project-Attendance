import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/Auth/LoginScreen';
import InfoScreen from './Screens/InfoScreen';
import QRcodeScreen from './Screens/QRcodeScreen';
import RecordedLecturesScreen from './Screens/RecordedLecturesScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import ForgetPass from './Screens/Auth/ForgetPass';
import { I18nManager, Text, View } from 'react-native';
import NavBar from './Components/Public/NavBar';
import AppHeaderComp from './Components/Public/AppHeaderComp';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useEffect, useState } from 'react';
import { InitiateAuth } from './redux/action/AuthAction';
import { AttendanceLocallyInitiate } from './redux/action/StudentAction';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state , setState] = useState({})
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  store.subscribe(() => {
    setState(store.getState())
  })

  useEffect(() => {
    store.dispatch(InitiateAuth())
    store.dispatch(AttendanceLocallyInitiate())
  } , [])
  return (
    <Provider store={store}>
      <AlertNotificationRoot>
        <NavigationContainer>
          <AppHeaderComp/>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            {
              state.Auth?.token ? (<>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Info" component={InfoScreen} />
                <Stack.Screen name="QR" component={QRcodeScreen} />
                <Stack.Screen name="Recorded" component={RecordedLecturesScreen} />
              </>) : (<>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgetPass" component={ForgetPass} />
              </>)
            }

          </Stack.Navigator>
          <NavBar/>
        </NavigationContainer>
      </AlertNotificationRoot>
    </Provider>
  );
}