import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez vos composants de vue
import CardDoctors from './components/CardDoctor/CardDoctorList';
import RegisterPatient  from './components/Authentification/Inscription/InscriptionPatient';
import RegisterDoctor from './components/Authentification/Inscription/InscriptionDoctor';

import LoginDoctorScreen from './components/Authentification/Login/LoginDoctor';
import LoginPatientScreen from './components/Authentification/Login/LoginPatient';
import AppointmentsScreen from './components/VisioConference/VisioConference';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="home" component={CardDoctors} />
        <Stack.Screen name="inscriptionDoctor" component={RegisterDoctor} />
        <Stack.Screen name="inscriptionPatient" component={RegisterPatient} />
        <Stack.Screen name="login" component={LoginDoctorScreen} />  
        <Stack.Screen name="loginPatient" component={LoginPatientScreen} />   
        <Stack.Screen name="callScreen" component={AppointmentsScreen} initialParams={{ doctorId: null }}/>   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;