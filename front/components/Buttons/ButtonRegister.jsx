import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "./Button.style";

const ButtonRegister = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRegister;
