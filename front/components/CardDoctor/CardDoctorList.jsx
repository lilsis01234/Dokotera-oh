import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";


const CardDoctors = ({ navigation }) => {
  const token = localStorage.getItem('token');
  const monid = localStorage.getItem('id');
  
  const etat = localStorage.getItem('etat');
  const role = localStorage.getItem('role');

  console.log(role)
  // console.log(monid)
  if (!token) {
    navigation.navigate('accueil');
    return null;
  }
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/doctor/allDoctor')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => {
          navigation.navigate('profil', { doctorId: monid });
        }}
      >
       
        <Image style={styles.profileButtonImage}source={require('../../assets/images/logoprofil.jpg')}/>
        <Text style={styles.profileButtonText}>Voir mon profil</Text>
      </TouchableOpacity>


      {etat === "docteur"? (
        <TouchableOpacity
        style={styles.profileButton}
         onPress={() => {
         navigation.navigate('listerendezVousDoctor', { doctorId: monid });
          }}
        >
        <Image style={styles.profileButtonImage}source={require('../../assets/images/calendar.jpg')}/>
          <Text style={styles.profileButtonText}>Mes rendez-vous</Text>
        </TouchableOpacity>

      ):(
        <TouchableOpacity
        style={styles.profileButton}
        onPress={() => {
          navigation.navigate('listerendezVousPatient', { PatientId: monid });
        }}
      >
       <Text style={styles.profileButtonText}>Mes rendez-vous</Text>
      </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => {
          navigation.navigate('accueil');
        }}
      >
 <Text style={styles.profileButtonText}>Se deconnecter</Text>
      </TouchableOpacity>


      <Text style={styles.header}>Tous les docteurs</Text>
      {doctors.map((doctor, index) => (
        <View key={index} style={styles.doctorCard}>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={{ uri: `http://localhost:3000/uploads/${doctor.photo}` }} />
           
            {etat === "patient" && role === "patient" && (
            <TouchableOpacity 
              style={styles.messageImage}
              onPress={() => {
                navigation.navigate('message', { destinataireId: doctor._id });
              }}
            >
              <Image style={styles.messagecardImage} source={require('../../assets/images/message.jpg')}/>
            </TouchableOpacity>
             )}

          
          </View>
          <Text style={styles.name}>
            {doctor.name} {doctor.firstname}
          </Text>
          <Text style={styles.speciality}>Spécialité: {doctor.speciality}</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate('callScreen', { doctorId: doctor._id });
            }}
          >
            <Text style={styles.actionButtonText}>Appeler maintenant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate('profil', { doctorId: doctor._id });
            }}
          >
          
          <Text style={styles.actionButtonText}>Voir son profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate('rendezVous', { doctorId: doctor._id });
            }}
          >
            <Text style={styles.actionButtonText}>Prendre un rendez-vous</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileButton: {
    backgroundColor: "#00897b",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    display:"flex",
    flexDirection:"row",
  },
  profileButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  doctorCard: {
    backgroundColor: "#00bfa6",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  speciality: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: "#00897b",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  profileButtonImage:{
    width:20,
    height:20,
    marginRight:10,
    borderRadius:"50%",
  },
  messageImage:{
    marginRight:25,
    marginTop:5,
  },
  messagecardImage:{
    width:40,
    height:40,
    borderRadius:10,
  }
});

export default CardDoctors;
