import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const AppointmentListDoctor = ({ route, navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(route.params.doctorId);

    // Use route.params.doctorId directly, without further destructuring
    const idDocteur = route.params.doctorId;

    axios
      .get(`http://127.0.0.1:3000/rendezvous/rendezvouslist/${idDocteur}`)
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });

    // Fetch demands
    axios
      .get(`http://127.0.0.1:3000/rendezvous/rendezvousnonapplist/${idDocteur}`)
      .then((response) => {
        setDemands(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching demands:", error);
        setLoading(false);
      });
  }, [route.params]);

  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.patientName}>{item.patient.name} {item.patient.firstname}</Text>
      <Text style={styles.appointmentDescription}>{item.description}</Text>
      <Text style={styles.appointmentTime}>{item.date} à {item.heureStart}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={demands}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={styles.yellowBackground}
          />
          {appointments.length === 0 && demands.length === 0 && (
            <Text>No Appointments</Text>
          )}
        </>
      )}
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
  yellowBackground: {
    backgroundColor: "yellow",
  },
});

export default AppointmentListDoctor;
