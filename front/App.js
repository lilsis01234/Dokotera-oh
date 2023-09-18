import { ImageBackground, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CardRdv from "./components/CardRdv/CardRdv";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";
import { ListRdv } from "./components/CardRdv/ListRdv";
import { s } from "./components/CardDoctor/CardDoctor.style";
import { Register } from "./components/pages/Register";
import AppointmentList from "./components/CardRdv/ItemRdv";

const appointments = [
  { id: 1, date: '2023-09-20', time: '10:00 AM', description: 'Cabinet du médecin', name: 'Rendez-vous médical' },
  { id: 2, date: '2023-09-21', time: '3:00 PM', description: 'Bureau', name: 'Réunion de travail' },
  // Ajoutez d'autres rendez-vous ici
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <AppointmentList appointments={appointments} />
      </SafeAreaView>
    </SafeAreaProvider>
import { ProfilDoctor } from "./components/ProfilDoctor/ProfilDoctor";
import Sary from "./assets/fond.jpg";

export default function App() {
  return (
    <ImageBackground source={Sary} style={s.form}>
      <SafeAreaProvider>
        <SafeAreaView style={s.form}>
          <ProfilDoctor />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginDoctorScreen from "./screens/LoginDoctorScreen";
import LoginPatientScreen from "./screens/LoginPatientScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegisterScreen}
        ></Stack.Screen>
        <Stack.Screen name="LoginDoctorScreen" component={LoginDoctorScreen} />
        <Stack.Screen name="LoginPatientScreen" component={LoginPatientScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
