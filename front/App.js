import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Eto mi-affiche anle components</Text>
<<<<<<< HEAD
        <CardDoctor/>
=======
        <Header/>
>>>>>>> c799c521767a23e53a5800d34a33da5744fce1f2
        <CardList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
