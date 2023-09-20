import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";

const PatientAppointments = ({ route }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idPatient = route.params.PatientId;

    axios
      .get(`http://127.0.0.1:3000/rendezvous/rendezvouslistpatient/${idPatient}`)
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        setLoading(false);
      });
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vos rendez-vous</Text>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <View>
          {appointments.map((appointment, index) => (
            <View
              key={index}
              style={[
                styles.appointmentItem,
                { backgroundColor: appointment.approbation === 1 || appointment.approbation === true ? "green" : "red" },
              ]}
            >
              <Text style={styles.patientName}>
                Rendez-Vous avec le docteur {appointment.docteur.name} {appointment.docteur.firstname}
              </Text>
              <Text style={styles.appointmentDescription}>{appointment.description}</Text>
              <Text style={styles.appointmentTime}>
                {appointment.date} à {appointment.heureStart}
              </Text>
                {appointment.approbation===1 || appointment.approbation === true ? 
                (<Text style={styles.patientName}>Approuvé</Text>):
                (<Text style={styles.patientName}>En attente d'approbation</Text>
                )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
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
    color:"white",
  },
  appointmentItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color:"#ffffff",
  },
  appointmentDescription: {
    fontSize: 16,
    marginTop: 5,
    color:"#ffffff",
  },
  appointmentTime: {
    fontSize: 14,
    marginTop: 5,
    color: "#ffffff",
  },
});

export default PatientAppointments;
