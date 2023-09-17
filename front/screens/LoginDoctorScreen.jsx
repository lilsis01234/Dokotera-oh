import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import React, { useDebugValue } from "react";
import COLORS from "../theme/index";
import Input from "../components/Input/Input";
import { style } from "../components/Input/Input.style";
import ButtonRegister from "../components/Buttons/ButtonRegister";
import Loader from "../components/Loader/Loader";

const LoginDoctorScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    if (!inputs.email) {
      handleError("Veyez remplire ce champ", "email");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Veyez remplire ce champ", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...userData, loggedIn: true })
          ); 
          navigation.navigate("HomeScreen");
        } else {
          Alert.alert("Error", "Information invalide");
        }
      } else {
        Alert.alert("Error", "Cet utilisateur n'existe pas");
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          padding: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "black", fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
          Login
        </Text>
        <Text style={{ color: "grey", fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          Connexion en temps que Docteur
        </Text>

        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="gabigabi@fabi.sk"
            iconName="email-outline"
            label="Email:"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          <Input
            placeholder="Votre mot de passe"
            iconName="lock-outline"
            label="Mot de passe:"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
          />
          <ButtonRegister title="Se connecter" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("RegistrationScreen")}
            style={style.loginLink}
          >
    
            Pas encore de compte ? <Text style={{color: COLORS.pricipalaColorBlue,textDecorationLine: 'underline'}}>En Créer un</Text> 
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginDoctorScreen;
