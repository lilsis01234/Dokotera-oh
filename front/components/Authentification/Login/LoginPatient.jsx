import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { styles } from "./LoginGabi.style";
import { style } from "../../Input/Input.style";
import COLORS from "../../../theme";

const LoginPatientScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/auth/loginPatient",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Login Response Data:", response.data);
        navigation.navigate("home");
      } else {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Login failed. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carre}>
        <Image
          style={styles.logoPatient}
          source={require("../../../assets/images/logoPatient.png")}
        />
      </View>
      {/* <Text style={styles.textLabel}>Veuillez vous connecter</Text> */}
      <Text style={styles.textLabel}>Votre email :</Text>
      <TextInput
        style={styles.textInput}
        placeholder="fabiola@fab.com"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.textLabel}>Votre mot de passe:</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <Text
        onPress={() => navigation.navigate("inscriptionPatient")}
        style={[style.loginLink]}
      >
        Pas encore de compte ?{" "}
        <Text
          style={[
            {
              color: COLORS.pricipalaColorBlue,
              textDecorationLine: "underline",
            },
          ]}
        >
          Créer un compte en temps que Patient
        </Text>
      </Text>
    </View>
  );
};

export default LoginPatientScreen;
