import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 for icons

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>

       <Image style = {styles.photo} source={require('../assets/images/bienvenue.jpg')}/>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("login")}
        >
          <FontAwesome5 name="user-md" size={80} color="#00bfa6" />
          <Text style={styles.optionText}>Docteur</Text>
        </TouchableOpacity>
        <View style={styles.space}></View>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("loginPatient")}
        >
          <FontAwesome5 name="user-injured" size={80} color="#00bfa6" />
          <Text style={styles.optionText}>Patient</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Pas encore de compte?</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("inscriptionDoctor")}
        >
          <FontAwesome5 name="user-md" size={80} color="#00bfa6" />
          <Text style={styles.optionText}>Inscription Docteur</Text>
        </TouchableOpacity>
        <View style={styles.space}></View>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("inscriptionPatient")}
        >
          <FontAwesome5 name="user-injured" size={80} color="#00bfa6" />
          <Text style={styles.optionText}>Inscription Patient</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  option: {
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    marginTop: 10,
    color: "#00bfa6",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  space: {
    width: 20,
    height: 20,
  },
  photo: {
    width:250,
    height:70,
    position:"relative",
    zIndex: 1000,
  }
});

export default Login;
