import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const UserProfile = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);

  const id = localStorage.getItem('id');
  
  useEffect(() => {
    console.log(route.params.doctorId)
    const idDocteur  = route.params.doctorId;

    axios.get(`http://localhost:3000/doctor/profil/${idDocteur}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params]);

  const renderUserProfile = () => {
    if (!userData) {
      return <Text>Chargement en cours...</Text>;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: `http://localhost:3000/uploads/${userData.photo}` }} />
        <Text style={styles.name}>{userData.name} {userData.firstname}</Text>
        <Text style={styles.speciality}>{userData.speciality}</Text>
        <Text style={styles.contact}>{userData.contact}</Text>

        {userData.experience && (
          <View style={styles.experienceContainer}>
            <Text style={styles.experienceTitle}>Expérience:</Text>
            <Text style={styles.experience}>{userData.experience}</Text>
          </View>
        )}

        {userData.weight && (
          <Text style={styles.additionalInfo}>Poids: {userData.weight}</Text>
        )}

        {userData.dateOfBirth && (
          <Text style={styles.additionalInfo}>Date de naissance: {userData.dateOfBirth}</Text>
        )}

        {userData.address && (
          <Text style={styles.additionalInfo}>Adresse: {userData.address}</Text>
        )}

        {userData._id !== id && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('callScreen', { userData: doctor._id });
          }}
        >
          <Text style={styles.buttonText}>Appeler maintenant</Text>
        </TouchableOpacity>)}
      </View>
    );
  };

  return (
    <View style={styles.pageContainer}>
      {renderUserProfile()}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  speciality: {
    fontSize: 18,
    marginBottom: 5,
  },
  contact: {
    fontSize: 16,
    marginBottom: 10,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 16,
    marginRight: 5,
  },
  experience: {
    fontSize: 16,
  },
  additionalInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#00bfa6',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default UserProfile;
