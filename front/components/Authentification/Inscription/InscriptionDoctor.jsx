import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export const Register = () => {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [contact, setContact] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from your backend when the component mounts
    axios
      .get("http://127.0.0.1:3000/role/getRole")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleSubmit = () => {
    if (!name || !firstname || !contact || !speciality || !experience || !email || !password || !selectedRole) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Prepare the data to be sent to the server for registration
    const formData = {
      name,
      firstname,
      contact,
      speciality,
      experience,
      email,
      password,
      Role: selectedRole,
    };

    axios.post('http://127.0.0.1:3000/doctor/inscriptionDoctor', formData)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
        Alert.alert("Success", "Registration successful");
      })
      .catch((error) => {
        // Handle any errors from the server
        console.error(error);
        Alert.alert("Error", "Registration failed");
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, paddingTop: 20 }}>
      <Text style={{ fontSize: 30 }}>Sign Up</Text>
      <View style={{ marginTop: 20 }}>
        <Text>Last Name :</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="raharimanana"
          onChangeText={(text) => setName(text)}
        />
        <Text>First Name :</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="fabiola"
          onChangeText={(text) => setFirstname(text)}
        />
        <Text>Contact:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="contact"
          onChangeText={(text) => setContact(text)}
        />
        <Text>Speciality:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="specialité"
          onChangeText={(text) => setSpeciality(text)}
        />
        <Text>Experience:</Text>
        <TextInput
          style={{ padding: 10, backgroundColor: "lightgray", borderRadius: 10, marginBottom: 10 }}
          placeholder="experience"
          onChangeText={(text) => setExperience(text)}
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
          onValueChange={(itemValue, itemIndex) =>
            setSelectedRole(itemValue)
          }
        >
          <Picker.Item label="Select a Role" value="" />
          {roles.map((role) => (
            <Picker.Item
              key={role._id} // Replace with the actual key for each role
              label={role.RoleTitle} // Display the role title
              value={role._id} // Store the role ID
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
