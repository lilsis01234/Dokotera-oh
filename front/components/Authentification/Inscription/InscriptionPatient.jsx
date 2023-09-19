import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const RegisterPatient = () => {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [contact, setContact] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // Change to a string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!result.cancelled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !firstname ||
      !contact ||
      !dateOfBirth ||
      !address ||
      !email ||
      !password ||
      !selectedRole
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // Convert the selected image to a blob
      const response = await fetch(photo);
      const blob = await response.blob();

      // Prepare the data to be sent to the server for registration
      const formData = new FormData();
      formData.append("name", name);
      formData.append("firstname", firstname);
      formData.append("contact", contact);
      formData.append("weight", weight);
      formData.append("address", address);

      // Convert dateOfBirth string to a Date object
      const dateOfBirthDate = new Date(dateOfBirth);
      formData.append("dateOfBirth", dateOfBirthDate);

      formData.append("email", email);
      formData.append("password", password);
      formData.append("Role", selectedRole);
      formData.append("photo", blob, "photo.jpg");

      // Send the POST request to the backend
      const res = await axios.post(
        "http://127.0.0.1:3000/patient/inscriptionPatient",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      Alert.alert("Success", "Registration successful");
      navigation.navigate("accueil");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Registration failed");
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/role/getRole")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, paddingTop: 20 }}>
      <Text style={{ fontSize: 30 }}>Sign Up</Text>
      <View style={{ marginTop: 20 }}>
        {/* ...other input fields... */}
        
        {/* Custom date input field */}
       
        <Text>Photo:</Text>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <Button title="Pick an image from camera roll" onPress={pickImage} />

        <Text>Nom :</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="raharimanana"
          onChangeText={(text) => setName(text)}
        />
        <Text>Prénoms :</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="fabiola"
          onChangeText={(text) => setFirstname(text)}
        />
         <Text>Date de naissance:</Text>
        <input
          type="date"
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          onChange={(e) => setDateOfBirth(e.target.value)} // Set the date as a string
        />
        <Text>Contact:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="contact"
          onChangeText={(text) => setContact(text)}
        />
        <Text>Poids:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="poids"
          onChangeText={(text) => setWeight(text)}
        />
        <Text>Adresse:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="Adresse"
          onChangeText={(text) => setAddress(text)}
        />
        
        <Text>Email Address:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Password:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          secureTextEntry
          placeholder="mot de passe"
          onChangeText={(text) => setPassword(text)}
        />

        <Text>Role:</Text>
        <Picker
          style={{
            padding: 10,
            backgroundColor: "lightgray",
            borderRadius: 10,
            marginBottom: 10,
          }}
          selectedValue={selectedRole}
          onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
        >
          <Picker.Item label="Select a Role" value="" />
          {roles.map((role) => (
            <Picker.Item
              key={role._id}
              label={role.RoleTitle}
              value={role._id}
            />
          ))}
        </Picker>

        <TouchableOpacity
          style={{ backgroundColor: "blue", borderRadius: 20, padding: 15, alignItems: "center" }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterPatient;
