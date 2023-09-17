import React from "react";
import { s } from "./ButtonGoBack.style";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const ButtonGoBack = () => {

    const backnavigate = useNavigation();

    return (
    <TouchableOpacity
      style={s.butGoBack}
      >
      <Icon
        onPress={() => backnavigate.goBack()}
        style={s.iconBack} name="arrow-left"/>
    </TouchableOpacity>
  );
};
