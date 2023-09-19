import { s } from "./CardDoctor.style";
import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import axios from "axios"; // Import axios for making API requests
import AppointmentForm from "../ListeRendezVous/AjoutRendezVous";

const CardDoctors = ({ navigation }) => {
  const token = localStorage.getItem('token');
  const idDoctor = localStorage.getItem('id');
  
  if (!token) {
    navigation.navigate('accueil');
    return null; // Ne rend rien tant que la redirection n'est pas effectuée
  }
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data from the backend
    axios.get('http://127.0.0.1:3000/doctor/allDoctor') // Add "http://" before the URL
      .then((response) => {
        // Store the fetched data in the state
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

  console.log(doctors)
  return (
    <View>
    <Text>Tous les docteurs</Text>
    <TouchableOpacity
              onPress={() => {
              navigation.navigate('profil', { doctorId: idDoctor });
    }}
    >
    <Text>Voir mon profil</Text>
    </TouchableOpacity>
    <View style={s.form}>
      {doctors.map((doctor, index) => (
        <View key={index} style={s.form1}>
          <View style={s.image} ClassName="flex-row justify-center -mt-14">
            <Image style={s.photo} source={{ uri: `http://localhost:3000/uploads/${doctor.photo}` }} />
          </View>
          <Text style={s.text}>
            <Text style={s.text2}> Name </Text> {doctor.name} {doctor.firstname}
            <br />
            <Text style={s.text2}> Spécialité:</Text> {doctor.speciality}
            <br />
            <TouchableOpacity
              onPress={() => {
              navigation.navigate('callScreen', { doctorId: doctor._id });
           }}
            >
          <Text>Appeler maintenant</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => {
              navigation.navigate('profil', { doctorId: doctor._id });
           }}
            >
          <Text>Voir son profil</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => {
              navigation.navigate('rendezVous', { doctorId: doctor._id });
           }}
          >
          <Text>Prendre un rendez-vous</Text>
          </TouchableOpacity>

          </Text>
        </View>
      ))}
    </View>
    </View>
  );
}

export default CardDoctors
