import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";

const AppointmentListDoctor = ({ route }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idDocteur = route.params.doctorId;

    axios
      .get(`http://127.0.0.1:3000/rendezvous/rendezvouslist/${idDocteur}`)
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        setLoading(false);
      });
  }, [route.params]);

  const approveAppointment = (id) => {
    axios
      .post(`http://127.0.0.1:3000/rendezvous/approbation/${id}`)
      .then((response) => {
      })
      .catch((error) => {
        console.error("Erreur lors de l'approbation du rendez-vous :", error);
      });
  };

  const cancelApproveAppointment = (id) => {
    axios
      .post(`http://127.0.0.1:3000/rendezvous/annulerapprobation/${id}`)
      .then((response) => {
      })
      .catch((error) => {
        console.error("Erreur lors de l'approbation du rendez-vous :", error);
      });
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.appointmentItem,
        { backgroundColor: item.approbation ? "white" : "yellow" },
      ]}
    >
      <Text style={styles.patientName}>
        {item.patient.name && item.patient.firstname
          ? `Rendez-vous avec ${item.patient.name} ${item.patient.firstname}`
          : "anonymous"}
      </Text>
      <Text style={styles.appointmentDescription}>{item.description}</Text>
      <Text style={styles.appointmentTime}>
        {item.date} à {item.heureStart}
      </Text>
      {!item.approbation ? (
        <Button
          title="Approuver"
          onPress={() => approveAppointment(item._id)}
        />
      ) : (
        <Button
          title="Annuler l'approbation"
          onPress={() => cancelApproveAppointment(item._id)}
        />
      )}
    </View>
  );
  
console.log(appointments)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos rendez-vous</Text>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
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
});

export default AppointmentListDoctor;
