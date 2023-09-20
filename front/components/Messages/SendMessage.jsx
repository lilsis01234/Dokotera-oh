import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import DocumentPicker from "react-native-document-picker";

const MessageForm = ({ route }) => {
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { destinataireId } = route.params;

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });

      // Store selected files in the state
      setSelectedFiles(result);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Handle canceled picker
      } else {
        // Handle other errors
        console.error(error);
      }
    }
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
        formData.append("pieceJointes", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      }

      // Make an API request to create the chat with files
      const response = await axios.post(
        "http://127.0.0.1:3000/chat/chat",
        formData
      );

      console.log(response.data);
      Alert.alert("Success", "Chat created successfully.");
      // You can add navigation logic to go back or navigate to a different screen
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create the chat.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity onPress={handleFilePick} style={styles.filePicker}>
        <Text style={styles.filePickerText}>Select Files</Text>
      </TouchableOpacity>

      {selectedFiles.length > 0 && (
        <Text style={styles.selectedFilesText}>
          {selectedFiles.length} file(s) selected
        </Text>
      )}

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
  textArea: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
  },
  filePicker: {
    backgroundColor: "#00bfa6",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  filePickerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  selectedFilesText: {
    fontSize: 16,
    marginBottom: 10,
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
