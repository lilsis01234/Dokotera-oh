import { Text, View } from "react-native";
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
  );
}
