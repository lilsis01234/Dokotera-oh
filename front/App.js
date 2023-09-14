import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Eto mi-affiche anle components</Text>
        <CardDoctor/>
        <CardList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
