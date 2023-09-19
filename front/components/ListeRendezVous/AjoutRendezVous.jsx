import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const AppointmentForm = ({ route }) => {
    const [date, setDate] = useState(""); // State for date
    const [time, setTime] = useState(""); // State for time
    const [description, setDescription] = useState(""); // State for description
  
    const { doctorId } = route.params;
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
          docteur: doctorId,
          contenu: description,
          date: `${dateRendezVous}`, 
          heureStart:`${time}`
        };
  
        // Make an API request to create the appointment
        const response = await axios.post("http://127.0.0.1:3000/rendezvous/rendezvous", appointmentData);
  
        console.log(response.data);
        Alert.alert("Success", "Appointment created successfully.");
        // You can add navigation logic to go back or navigate to a different screen
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to create the appointment.");
      }
    };
  
    return (
      <View>
        <Text>Date:</Text>
        <input
          type="date"
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          onChange={(e) => setDate(e.target.value)} // Set the date as a string
        />
  
        <Text>Heure:</Text>
        <TextInput
         style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="HH:MM"
          value={time}
          onChangeText={(text) => setTime(text)}
        />
  
        <Text>Description:</Text>
        <TextInput
         style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          multiline
          placeholder="Raison de votre rendez-vous"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
  
        <TouchableOpacity onPress={handleAppointmentSubmit}
         style={{ backgroundColor: "blue", borderRadius: 20, padding: 15, alignItems: "center" }}>
          <Text>Confirmer</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default AppointmentForm;
  