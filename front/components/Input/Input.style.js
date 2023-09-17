import { StyleSheet } from "react-native";
import COLORS from "../../theme";

export const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 500,
    color: COLORS.gray,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "gray",
    alignItems: "center",
    borderRadius: 10,
  },

  icon: {
    fontSize: 22,
    color: COLORS.darkBlue,
    marginRight: 10,
  },

  textInput: {
    fontSize: 20,
    color: COLORS.darkBlue,
    flex: 1,
    borderColor: "red",
  },

  errorText: {
    color: COLORS.red,
    fontSize: 15,
    marginTop: 7,
    fontWeight: 700,
    textAlign: "center",
  },

  iconEye: {
    fontSize: 22,
    color: COLORS.darkBlue,
  },
  loginLink: {
    marginTop: 10,
    color: COLORS.black,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
