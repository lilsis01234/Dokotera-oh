import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CardRdv from "./components/CardRdv/CardRdv";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";
import { s } from "./components/CardDoctor/CardDoctor.style";
import { Register } from "./components/pages/Register";
import {RegisterDoctor} from "./components/Authentification/Inscription/InscriptionDoctor"

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.form}>
        <CardDoctor/>
        <RegisterDoctor/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
