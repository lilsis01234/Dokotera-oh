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
import { ButtonGoBack } from "../components/ButtonGoBack/ButtonGoBack";

const RegisterDoctorScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    lName: "",
    fName: "",
    phone: "",
    password: "",
    xp: "",
    special: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    if (!inputs.email) {
      handleError("Veuillez remplire ce champ", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      valid = false;
      handleError("Votre email n'est pas valide", "email");
    }

    if (!inputs.lName) {
      handleError("Veuillez remplire ce champ", "lName");
      valid = false;
    }

    if (!inputs.fName) {
      handleError("Veuillez remplire ce champ", "fName");
      valid = false;
    }

    if (!inputs.px) {
      handleError("Veuillez remplire ce champ", "xp");
      valid = false;
    }

    if (!inputs.special) {
      handleError("Veuillez remplire ce champ", "special");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Veuillez remplire ce champ", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      valid = false;
      handleError("Doit contenir au moins 8 carractères", "password");
    }

    if (!inputs.phone) {
      handleError("Veuillez remplire ce champ", "phone");
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
        AsyncStogare.setItem("user", JSON.stringify(inputs));
        navigation.navigate("LoginScreen");
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
      <ButtonGoBack />
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          padding: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Docteur
        </Text>
        <Text
          style={{
            color: "grey",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Créer un compte en temps que Docteur
        </Text>

        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Votre nom"
            iconName="account-outline"
            label="Nom:"
            error={errors.lName}
            onFocus={() => {
              handleError(null, "lName");
            }}
            onChangeText={(text) => handleOnChange(text, "lName")}
          />
          <Input
            placeholder="Votre Prénom"
            iconName="account-outline"
            label="Prénom:"
            error={errors.fName}
            onFocus={() => {
              handleError(null, "fName");
            }}
            onChangeText={(text) => handleOnChange(text, "fName")}
          />
          <Input
            placeholder="Dentiste"
            iconName=""
            label="Spécialité:"
            error={errors.special}
            onFocus={() => {
              handleError(null, "special");
            }}
            onChangeText={(text) => handleOnChange(text, "special")}
          />
          <Input
            placeholder="Année (ex:10ans)"
            iconName=""
            label="Experience:"
            error={errors.xp}
            onFocus={() => {
              handleError(null, "xp");
            }}
            onChangeText={(text) => handleOnChange(text, "xp")}
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
            onPress={() => navigation.navigate("LoginDoctorScreen")}
            style={style.loginLink}
          >
            Vous avez dejà un compte ?
            <Text
              style={{
                color: COLORS.pricipalaColorBlue,
                textDecorationLine: "underline",
              }}
            >
              Se Connecter en temps que docteur
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterDoctorScreen;
