import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardList } from "./components/CardList/CardList";
import { CardDoctor } from "./components/CardDoctor/CardDoctor";
import { s } from "./components/CardDoctor/CardDoctor.style";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.form}>
        <CardDoctor
          firstname={"mandresy"}
          name={"santatsoa"}
          specialité={"généraliste"}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
