import AsyncStogare from "@react-native-async-storage/async-storage";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import COLORS from "../theme";
import { styles } from "./HomeScreen.style";
import { ButtonGoBack } from "../components/ButtonGoBack/ButtonGoBack";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ButtonGoBack />
        <View style={styles.header}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputSearch}
              placeholder="Recherche"
            ></TextInput>

            <Icon name="" />
          </View>
          <Image
            style={styles.imageUser}
            source={require("../assets/images/avatar.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
