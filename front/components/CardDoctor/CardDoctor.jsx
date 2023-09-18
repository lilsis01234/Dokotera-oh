import { s } from "./CardDoctor.style";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import axios from "axios"; // Import axios for making API requests

export function CardDoctor() {
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
    <View style={s.form}>
      {doctors.map((doctor, index) => (
        <View key={index} style={s.form1}>
          <View style={s.image} ClassName="flex-row justify-center -mt-14">
            <Image style={s.photo} source={{ uri: `http://localhost:3000/uploads/${doctor.photo}` }} />
          </View>
          <Text style={s.text}>
            <Text style={s.text2}> Name </Text> {doctor.name} {doctor.firstname}
            <br />
            <Text style={s.text2}> firstname:</Text> {doctor.speciality}
            <br />
            <Text style={s.text2}> specialité </Text>
            {doctor.contact}
          </Text>
        </View>
      ))}
    </View>
  );
}
