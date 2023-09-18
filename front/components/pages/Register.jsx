import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Alert,
} from "react-native";

export const Register = () => {
  const [person, setPerson] = useState({});
  const [fName, setFname] = useState();
  const [lName, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [count, setCount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(fName, lName, password, email);
    Alert.alert("Hello");
  }

  return (
    <>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <Text className="text-[30px]">Sign Up</Text>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Last Name :</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="John"
            onChange={(e) => setLname(e.target.value)}
          />
          <Text className="text-gray-700 ml-4">First Name :</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Doe"
            onChange={(e) => setFname(e.target.value)}
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TouchableOpacity
            className="py-3 bg-blue-400 rounded-xl"
            onFormSubmit={handleSubmit}
          >
            <Text className="font-xl font-bold text-center">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
