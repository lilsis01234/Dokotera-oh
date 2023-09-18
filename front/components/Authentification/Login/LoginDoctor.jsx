import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const LoginDoctorScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/doctor/loginDoctor", {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful
        // Save user data or token in AsyncStorage or Redux store
        // Redirect to the home screen or another screen
        navigation.navigate("Home"); // Replace "Home" with your screen name
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
      <Text>Email:</Text>
      <TextInput
        placeholder="Votre email"
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Votre mot de passe"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

export default LoginDoctorScreen;
