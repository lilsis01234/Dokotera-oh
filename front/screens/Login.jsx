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
          <Text style={styles.loginText}>Se connecter en tant que</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonRegister
            title="Docteur"
            onPress={() => navigation.navigate("login")}
          />
          <ButtonRegister
            title="Patient"
            onPress={() => navigation.navigate("loginPatient")}
          />
        </View>
        
        {/* <View style={styles.textContainer}>
          <Text style={styles.loginText}>Pas encore de compte ? S'inscrire en tant que </Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonRegister
            title="Docteur"
            onPress={() => navigation.navigate("inscriptionDoctor")}
          />
          <ButtonRegister
            title="Patient"
            onPress={() => navigation.navigate("inscriptionPatient")}
          />
        </View> */}
      </View>
    </>
  );
};

export default Login;
