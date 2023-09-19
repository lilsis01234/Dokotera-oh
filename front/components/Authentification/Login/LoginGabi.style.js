import { StyleSheet } from "react-native";
import COLORS from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },

  loginText: {
    fontSize: 40,
    fontWeight: "lighter",
    marginBottom: 50,
  },

  // style vaovao ------------

  textContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },

  buttonContainer: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.pricipalaColorGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  textLabel: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: 500,
    fontSize: 20,
  },

  textInput: {
    padding: 10,
    paddingLeft: 15,
    fontSize: 20,
    height: 50,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 20,
    placeholderTextColor: COLORS.darkBlue,
    outlineColor: COLORS.darkBlue,
  },

  imageLogo: {
    width: "100%",
    height: 150,
  },
  carre: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: 1000,
  },

  logoPatient: {
    width: "100%",
    height: 100,
  }
});
