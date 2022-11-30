import React, { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Button, Pressable, Flex, Box } from "native-base";

import { plant_icons } from "../../Constants/StaticPlantIconImages";

const SelectPlantCard = ({ i, iconNum, name, selected, setSelected }) => {
  return (
    <Pressable key={i}        
      style={styles.plant}
      onPress={() => {
        setSelected(i)
      }}
      
      _text={{
        color: "#432D1E",
      }}
    > 
      <Flex bg={(selected === i) ? "silver": "transparent"} w="100%" h="100px" direction="row" 
      alignItems="center" justifyContent="flex-start" rounded={2} pr={3}>
        <Image
          style={{ height: 75, width: 75, marginRight: 20, marginTop: 20, marginBottom: 20}}
          source={plant_icons[iconNum]}
        />
        <Box>
          <Text 
            style={styles.plant_name}
          >{name}</Text>
        </Box>
      </Flex>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  plant: { backgroundColor: "transparent" },
  plant_name: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "900",
    fontSize: 17,
  },
});

export { SelectPlantCard };
