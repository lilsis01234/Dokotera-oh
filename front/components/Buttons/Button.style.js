import { StyleSheet } from "react-native";
import COLORS from "../../theme";

export const styles = StyleSheet.create({
  button: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.pricipalaColorBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textButton: {
    color: COLORS.light,
    fontWeight: "bold",
    fontSize: 20,
  },
});
