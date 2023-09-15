import { s } from "./CardDoctor.style";
import { Image, Text, View } from "react-native";

export function CardDoctor({ firstname, name, specialité }) {
  return (
    <View style={s.form}>
      <View style={s.form1}>
        <View style={s.image} ClassName="flex-row justify-center -mt-14">
          <Image style={s.photo} source={require("../../assets/photo.jpg")} />
        </View>
        <Text style={s.text}>
          <Text style={s.text2}> Name </Text> {name}
          <br />
          <Text style={s.text2}> firstname:</Text> {firstname}
          <br />
          <Text style={s.text2}> specialité </Text>
          {specialité}
        </Text>
      </View>
    </View>
  );
}
