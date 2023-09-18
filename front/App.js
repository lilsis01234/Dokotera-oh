import { ImageBackground, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CardRdv from "./components/CardRdv/CardRdv";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";
import { s } from "./components/CardDoctor/CardDoctor.style";
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
  );
}
