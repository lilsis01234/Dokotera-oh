import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CardRdv from "./components/CardRdv/CardRdv";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";
import { ListRdv } from "./components/CardRdv/ListRdv";
import { s } from "./components/CardDoctor/CardDoctor.style";
import { Register } from "./components/pages/Register";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
            <ListRdv/>
            <CardRdv/>
            <CardDoctor/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
