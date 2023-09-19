import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez vos composants de vue
import CardDoctors from './components/CardDoctor/CardDoctorList';
import RegisterPatient  from './components/Authentification/Inscription/InscriptionPatient';
import RegisterDoctor from './components/Authentification/Inscription/InscriptionDoctor';
import LoginDoctorScreen from './components/Authentification/Login/LoginDoctor';
import LoginPatientScreen from './components/Authentification/Login/LoginPatient';
import AppointmentsScreen from './components/VisioConference/VisioConference';
import Login from "./screens/Login";
import UserProfile from "./components/Profil/Profil";
import AppointmentForm from "./components/ListeRendezVous/AjoutRendezVous";
import AppointmentListDoctor from "./components/ListeRendezVous/ListeRendezVousDoctor";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="accueil">
        <Stack.Screen name="home" component={CardDoctors} />
        <Stack.Screen name="inscriptionDoctor" component={RegisterDoctor} />
        <Stack.Screen name="inscriptionPatient" component={RegisterPatient} />
        <Stack.Screen name="accueil" component={Login} /> 
        <Stack.Screen name="login" component={LoginDoctorScreen} />  
        <Stack.Screen name="loginPatient" component={LoginPatientScreen} />   
        <Stack.Screen name="callScreen" component={AppointmentsScreen} initialParams={{ doctorId: null }}/>  
        <Stack.Screen name="profil" component={UserProfile} initialParams={{ doctorId: null }}/>  
        <Stack.Screen name="rendezVous" component={AppointmentForm} initialParams={{ doctorId: null }}/>  
        <Stack.Screen name="listerendezVousDoctor" component={AppointmentListDoctor} initialParams={{ doctorId: null }}/>  
        <Stack.Screen name="listerendezVousPatient" component={AppointmentForm} initialParams={{ PatientId: null }}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;