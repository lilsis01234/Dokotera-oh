import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const AppointmentListPatient = ( { route, navigation } ) => {
  const [appointments, setAppointments] = useState([]);
 
  useEffect(() => {
    console.log(route.params.PatientId)
    const { idPatient } = route.params.PatientId;
    
    axios
      .get(`http://127.0.0.1:3000/rendezvous/rendezvouslistpatient/${idPatient}`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [route.params]);

  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.patientName}>{item.patient.name} {item.patient.firstname}</Text>
      <Text style={styles.appointmentDescription}>{item.description}</Text>
      <Text style={styles.appointmentTime}>{item.date.toLocaleDateString()} at {item.heureStart}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  appointmentItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  appointmentDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  appointmentTime: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
  },
});

export default AppointmentListPatient;
