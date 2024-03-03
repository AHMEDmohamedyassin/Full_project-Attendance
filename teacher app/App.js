import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/Auth/LoginScreen';
import InfoScreen from './Screens/InfoScreen';
import QRcodeScreen from './Screens/QRcodeScreen';
import LecturesScreen from './Screens/LecturesScreen';
import LectureCreateScreen from './Screens/LectureCreateScreen';
import LectureDetailScreen from './Screens/LectureDetailScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import ForgetPass from './Screens/Auth/ForgetPass';
import { I18nManager, Text, View } from 'react-native';
import NavBar from './Components/Public/NavBar';
import AppHeaderComp from './Components/Public/AppHeaderComp';
import ExcelFilesScreen from './Screens/ExcelFilesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  return (
      <NavigationContainer>
        <AppHeaderComp/>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgetPass" component={ForgetPass} />
          
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Details" component={LectureDetailScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Lectures" component={LecturesScreen} />
          <Stack.Screen name="Create" component={LectureCreateScreen} />
          <Stack.Screen name="QR" component={QRcodeScreen} />

          {/* <Stack.Screen name="Excel" component={ExcelFilesScreen} /> */}
          
        </Stack.Navigator>
        <NavBar/>
      </NavigationContainer>
  );
}