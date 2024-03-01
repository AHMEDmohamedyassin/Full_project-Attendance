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

const Stack = createNativeStackNavigator();

export default function App() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  return (
      <NavigationContainer>
        <AppHeaderComp/>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgetPass" component={ForgetPass} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="QR" component={QRcodeScreen} />
          <Stack.Screen name="Recorded" component={RecordedLecturesScreen} />
        </Stack.Navigator>
        <NavBar/>
      </NavigationContainer>
  );
}