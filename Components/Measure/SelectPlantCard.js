import React, { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Button, Flex } from "native-base";

import { plant_icons } from "../../Constants/StaticPlantIconImages";

const SelectPlantCard = ({ i, iconNum, name, onPress }) => {
  return (
    <Button
      style={styles.plant}
      onPress={() => {
        onPress(i);
      }}
      _text={{
        color: "#432D1E",
      }}
    >
      <Flex direction="row" alignItems="center" justifyContent="center-between">
        <Image
          style={{ height: 75, width: 75, marginRight: 20 }}
          source={plant_icons[iconNum]}
        />
        <Text style={styles.plant_name}>{name}</Text>
      </Flex>
    </Button>
  );
};

const styles = StyleSheet.create({
  plant: { backgroundColor: "transparent" },
  plant_name: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: 900,
    fontSize: 17,
  },
});

export { SelectPlantCard };
