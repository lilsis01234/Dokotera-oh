import { StyleSheet } from "react-native";
import COLORS from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.pricipalaColorBlue,
    backgroundColor: COLORS.light,
    padding: 20,
  },

  loginText: {
    fontSize: 40,
    // color: 'white',
    fontWeight: "lighter",
    marginBottom: 50,
  },

  textContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },

  buttonContainer: {
    flex: 2,
    gap: 20,
  },
});
