import { s } from "./CardDoctor.style";
import { Image, Text, View } from "react-native";

export function CardDoctor({ firstname, name }) {
  return (
    <View style={s.form}>
      <View style={s.form1}>
        <Image style={s.photo} source={require("../../assets/photo.jpg")} />
        <Text style={s.text}>
          firstname: {firstname} <br />
          Name: {name}
        </Text>
      </View>
    </View>
  );
}
