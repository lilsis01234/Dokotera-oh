import { View, Text, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { style } from "./Input.style";
import COLORS from "../../theme";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : "lightgrey",
          },
        ]}
      >
        <Icon style={style.icon} name={iconName} />
        <TextInput
          secureTextEntry={hidePassword}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          autoCorrect={false}
          style={style.textInput}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={style.iconEye}
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
          />
        )}
      </View>
      {error && <Text style={style.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
