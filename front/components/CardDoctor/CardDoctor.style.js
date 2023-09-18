import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  form: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center ",
    alignItems: "center",
  },
  form1: {
    backgroundColor: "#00bfa6",
    height: 350,
    width: 250,
    borderRadius: 50,
    fontSize: 15,
  },
  image: {
    shadowColor: "black",
    shadowRadius: "30",
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingVertical: 50,
    marginBottom: 6,
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 20,
    flex: 1,
  },
  text2: { textDecorationLine: "underline" },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  back: {
    backgroundColor: "",
  },
});

export { s };
