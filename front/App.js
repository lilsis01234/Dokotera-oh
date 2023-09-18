import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez vos composants de vue
import CardDoctor from './components/CardDoctor/CardDoctor';
import { RegisterDoctor } from './components/Authentification/Inscription/InscriptionPatient';
import LoginDoctorScreen from './components/Authentification/Login/LoginDoctor';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={CardDoctor} />
        <Stack.Screen name="inscriptionDoctor" component={RegisterDoctor} />
        {/* <Stack.Screen name="inscriptionPatient" component={} /> */}
        <Stack.Screen name="" component={LoginDoctorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;