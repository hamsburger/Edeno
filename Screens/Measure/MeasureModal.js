import React from "react";
import { Text, StyleSheet } from "react-native";
import { View } from "native-base";

const MeasureModal = ({ navigation }) => {
  return (
    <View style={styles.modal}>
      <Text>Choose Plant</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { MeasureModal };
