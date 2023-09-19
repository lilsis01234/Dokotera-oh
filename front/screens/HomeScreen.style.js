import { StyleSheet } from "react-native";
import COLORS from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  imageUser: {
    height: 35,
    width: 35,
    borderRadius: "50%",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 5,
  },

  inputSearch: {
    flex: 1,
    fontWeight: "lighter",
    color: COLORS.darkBlue,
    outlineWidth: 0,
    paddingLeft: 10,
  },

  textInput: {
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    height: 50,
    flex: 1,
    flexDirection: "row",
  },
});
