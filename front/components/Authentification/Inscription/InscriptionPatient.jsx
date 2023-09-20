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
  ScrollView,
  StyleSheet,
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

  //obtention des roles
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription Patient</Text>
      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>Sélectionner une photo</Text>
      </TouchableOpacity>
      {photo && (
        <Image
          source={{ uri: photo }}
          style={styles.imagePreview}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        onChangeText={(text) => setContact(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Poids"
        onChangeText={(text) => setWeight(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        onChangeText={(text) => setAddress(text)}
      />
      <Text style={styles.inputLabel}>Date de naissance:</Text>
      <TextInput
        type="date"
        style={styles.input}
        onChangeText={(text) => setDateOfBirth(text)} // Set the date as a string
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={selectedRole}
        onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
      >
        <Picker.Item label="Sélectionnez un rôle" value="" />
        {roles.map((role) => (
          <Picker.Item
            key={role._id}
            label={role.RoleTitle}
            value={role._id}
          />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleSubmit}
      >
        <Text style={styles.registerButtonText}>S'inscrire</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  imageButton: {
    backgroundColor: "#00bfa6",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "white",
    fontSize: 18,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  registerButton: {
    backgroundColor: "#00bfa6",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default RegisterPatient;
