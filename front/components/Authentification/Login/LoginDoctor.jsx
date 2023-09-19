import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, ImageBackground } from "react-native";
import axios from "axios";
import { styles } from "./LoginGabi.style";
import { style } from "../../Input/Input.style";
import COLORS from "../../../theme";

const LoginDoctorScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[token,setToken] = useState("");
  const[id,setId] = useState("");
  const[etat,setEtat] = useState("");


  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:3000/auth/loginDoctor", {
        email,
        password,
      });

      if (res.status === 200) {
        console.log("Login Response Data:", res.data);

        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('etat',res.data.etat)

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
    <View style={styles.carre} >
        <Image style={styles.imageLogo} source={require("../../../assets/images/logoDoctor.jpg")}/>
      </View>
      <Text style={styles.textLabel}>Votre email :</Text>
      <TextInput
        style={styles.textInput}
        placeholder="fabiola@fab.com"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.textLabel}>Votre mot de passe :</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Votre mot de passe"
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text> 
      </TouchableOpacity>
      <Text
            onPress={() => navigation.navigate("inscriptionDoctor")}
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
              Créer un compte en temps que Docteur
        </Text>
      </Text>
    </View>
  );
};

export default LoginDoctorScreen;
