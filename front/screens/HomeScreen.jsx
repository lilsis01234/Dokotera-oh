import AsyncStogare from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import COLORS from "../theme";
import { styles } from "./HomeScreen.style";
import { ButtonGoBack } from "../components/ButtonGoBack/ButtonGoBack";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ButtonGoBack/>
      <Text></Text>
    </View>
  );
};

export default HomeScreen;
