import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const LoginDoctorScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/auth/loginDoctor", {
        email,
        password,
      });

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
    <View>
    <Text>Votre email :</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="fabiola@fab.com"
          onChangeText={(text) => setEmail(text)}
        />
      <Text>Votre mot de passe:</Text>
      <TextInput
        style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

export default LoginDoctorScreen;
