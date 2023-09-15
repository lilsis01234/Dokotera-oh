import { Text, View, StatusBar} from "react-native";
import { s } from "./Header.style";

export function Header() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
