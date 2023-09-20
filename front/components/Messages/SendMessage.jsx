import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";

const MessageForm = ({ route }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const { destinataireId } = route.params;

  const handleAppointmentSubmit = async () => {
    try {
      // Validate form fields
      if (!date || !time || !description) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const dateRendezVous = new Date(date);

      // Construct the appointment object
      const appointmentData = {
        patient: localStorage.getItem("id"),
        docteur: destinataireId,
        contenu: description,
        date: new Date().getDate(), //To get the Current Seconds,
      };

      // Make an API request to create the appointment
      const response = await axios.post(
        "http://127.0.0.1:3000/chat/chat",
        appointmentData
      );

      console.log(response.data);
      Alert.alert("Success", "Appointment created successfully.");
      // You can add navigation logic to go back or navigate to a different screen
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create the appointment.");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Raison de votre rendez-vous"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity onPress={handleAppointmentSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Confirmer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
  },
  textArea: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
  },
  button: {
    backgroundColor: "#00bfa6",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MessageForm;
