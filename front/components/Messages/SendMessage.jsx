import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const MessageForm = ({ route }) => {
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigation = useNavigation()
  const { destinataireId } = route.params;
  const[destinataire,setDestinataire]=useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/doctor/profil/${destinataireId}`)
      .then((response) => {
        setDestinataire(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleAppointmentSubmit = async () => {
    try {
      // Validate form fields
      if (!description) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      // Create a FormData object to send both text and files
      const formData = new FormData();
      formData.append("patient", localStorage.getItem("id"));
      formData.append("docteur", destinataireId);
      formData.append("contenu", description);

      // Append selected files to FormData
      for (const file of selectedFiles) {
        formData.append("pieceJointes", file);
      }

      // Make an API request to create the chat with files
      const response = await axios.post("http://127.0.0.1:3000/chat/chat", formData);

      console.log(response.data);
      Alert.alert("Success", "Chat created successfully.");
      navigation.navigate("home");

      // You can add navigation logic to go back or navigate to a different screen
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create the chat.");
    }
  };

  return (
    <View style={styles.container}>
    <Text>A {destinataire.name} {destinataire.firstName}</Text>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />

      <TouchableOpacity onPress={handleAppointmentSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
  },
  textArea: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
  },
  button: {
    backgroundColor: "#00bfa6",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MessageForm;
