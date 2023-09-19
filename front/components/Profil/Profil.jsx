import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { s } from "../CardDoctor/CardDoctor.style";

const UserProfile = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null); // Initialize userData as null
  const etat = localStorage.getItem('etat'); // Get the value of 'etat' from localStorage

  useEffect(() => {
    const { doctorId } = route.params;

    // Make a GET request to fetch user data based on doctorId
    axios.get(`http://localhost:3000/doctor/profil/${doctorId}`)
      .then((response) => {
        // Set the fetched user data to the state
        setUserData(response.data);
      })
      .catch((error) => {
        // Handle errors appropriately
        console.error(error);
      });
  }, [route.params]);

  return (
    <View style={s.form}>
      {userData ? (
        etat === 'docteur' ? (
          <View  style={s.form1}>
            <View style={s.image} className="flex-row justify-center -mt-14">
              <Image style={s.photo} source={{ uri: `http://localhost:3000/uploads/${userData.photo}` }} />
            </View>
            <Text style={s.text2}> Nom </Text> {userData.name} {userData.firstname}
            <br />
            <Text style={s.text2}> Spécialité:</Text> {userData.speciality}
            <br />
            <Text style={s.text2}> Contact:</Text> {userData.contact}
            <br />
            <Text style={s.text2}> Experience:</Text> {userData.experience}
            <br />
            {/* Conditionally render based on the value of 'etat' */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('callScreen', { userData: doctor._id });
              }}
            >
              <Text>Appeler maintenant</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View  style={s.form1}>
            <View style={s.image} className="flex-row justify-center -mt-14">
              <Image style={s.photo} source={{ uri: `http://localhost:3000/uploads/${userData.photo}` }} />
            </View>
            <Text style={s.text2}> Nom </Text> {userData.name} {userData.firstname}
            <br />
            <Text style={s.text2}> Poids </Text> {userData.weight} 
            <br />
            <Text style={s.text2}> Date de naissance </Text> {userData.dateOfBirth} 
            <br />
            <Text style={s.text2}> Contact </Text> {userData.contact} 
            <br /> 
            <Text style={s.text2}> Adresse </Text> {userData.address} 
            <br />
          </View>
        )
      ) : (
        <Text>Chargement en cours...</Text>
      )}
    </View>
  );
};

export default UserProfile;
