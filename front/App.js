import { Text, View, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CardRdv from "./components/CardRdv/CardRdv";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <Text>Eto mi-affiche anle components</Text>
          <CardRdv />
          <CardDoctor/>
          <CardList />
          <Header/>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
