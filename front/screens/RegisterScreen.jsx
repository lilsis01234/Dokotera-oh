import AsyncStogare from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import COLORS from "../theme";
import Input from "../components/Input/Input";
import { style } from "../components/Input/Input.style";
import ButtonRegister from "../components/Buttons/ButtonRegister";
import Loader from "../components/Loader/Loader";

const RegisterScreen = ({ navigation }) => {
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
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      valid = false;
      handleError("Votre email n'est pas valide", "email");
    }

    if (!inputs.name) {
      handleError("Veyez remplire ce champ", "name");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Veyez remplire ce champ", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      valid = false;
      handleError("Doit contenir au moins 8 carractères", "password");
    }

    if (!inputs.phone) {
      handleError("Veyez remplire ce champ", "phone");
      valid = false;
    }

    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStogare.setItem("user",JSON.stringify(inputs));
        navigation.navigate('LoginScreen')
      } catch (error) {
        Alert.alert("Error", "Une erreur c'est produit");
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
        <Text style={{ color: "black", fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: "grey", fontSize: 18, fontWeight: "bold" }}>
          Entrez vos information
        </Text>

        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Votre nom"
            iconName="account-outline"
            label="Nom:"
            error={errors.name}
            onFocus={() => {
              handleError(null, "name");
            }}
            onChangeText={(text) => handleOnChange(text, "name")}
          />
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
          <Input
            // inputMode="numeric"
            KeyboardType="numeric"
            placeholder="Votre numéro de téléphone"
            iconName="phone-outline"
            label="Contact:"
            error={errors.phone}
            onFocus={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => handleOnChange(text, "phone")}
          />
          <ButtonRegister title="S'enregistrer" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={style.loginLink}
          >
            Vous avez dejà un compte ? Se Connecter
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
