import React from "react";
import { ActivityIndicator, View, useWindowDimensions, Text } from "react-native";
import { styles } from "./Loader.style";
import COLORS from "../../theme";

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.blue}/>
            <Text style={{marginLeft: 10, fontSize:16, fontWeight:500}}>Veyez Patienter...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;
