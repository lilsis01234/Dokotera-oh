import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginDoctorScreen from "./screens/LoginDoctorScreen";
import LoginPatientScreen from "./screens/LoginPatientScreen";
import RegisterScreen from "./screens/RegisterPatientScreen";
import RegisterDoctorScreen from "./screens/RegisterDoctorScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez vos composants de vue
import CardDoctors from './components/CardDoctor/CardDoctorList';
import RegisterPatient  from './components/Authentification/Inscription/InscriptionPatient';
import RegisterDoctor from './components/Authentification/Inscription/InscriptionDoctor';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="RegistrationDoctorScreen"
          component={RegisterDoctorScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="RegistrationScreen"
          component={RegisterScreen}
        ></Stack.Screen>
        <Stack.Screen name="LoginDoctorScreen" component={LoginDoctorScreen} />
        <Stack.Screen
          name="LoginPatientScreen"
          component={LoginPatientScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="home" component={CardDoctors} />
        <Stack.Screen name="inscriptionDoctor" component={RegisterDoctor} />
        {/* <Stack.Screen name="inscriptionPatient" component={} /> */}
        <Stack.Screen name="inscriptionPatient" component={RegisterPatient} />
        <Stack.Screen name="login" component={LoginDoctorScreen} />  
        <Stack.Screen name="loginPatient" component={LoginPatientScreen} />   

 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;