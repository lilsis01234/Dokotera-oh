import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CardRdv from "./components/CardRdv/CardRdv";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <View>
          <CardDoctor/>
          <CardRdv/>
          <CardList/>
          <Header/> 
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
