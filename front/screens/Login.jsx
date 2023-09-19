import AsyncStogare from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import COLORS from "../theme";
import { styles } from "./Login.style";
import ButtonRegister from "../components/Buttons/ButtonRegister";

const Login = ({ navigation }) => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.loginText}>Se connecter en temps que</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonRegister
            title="Docteur"
            onPress={() => navigation.navigate("LoginDoctorScreen")}
          />
          <ButtonRegister
            title="Patient"
            onPress={() => navigation.navigate("LoginPatientScreen")}
          />
        </View>
      </View>
    </>
  );
};

export default Login;
