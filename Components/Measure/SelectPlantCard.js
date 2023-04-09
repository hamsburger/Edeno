import React, { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Button, Pressable, Flex, Box } from "native-base";

import { plant_icons } from "../../Constants/StaticPlantIconImages";

const SelectPlantCard = ({ i, iconNum, plantObj, selected, setSelected }) => {
  return (
    <Pressable
      key={i}
      style={styles.plant}
      onPress={() => {
        setSelected(i);
      }}
      _text={{
        color: "#432D1E",
      }}
    >
      <Flex
        bg={selected === i ? "#E4E4E4" : "transparent"}
        w="100%"
        h="100px"
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        rounded={2}
      >
        <Image
          style={{
            height: 75,
            width: 75,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
          source={plant_icons[plantObj["iconId"]]}
        />
        <Box style={styles.text_overflow}>
          <Text style={styles.plant_name}>{plantObj["nickName"]}: ({plantObj["commonName"]})</Text>
        </Box>
      </Flex>
    </Pressable>
  );
};

// {plantObj["nickName"]}: ({plantObj["commonName"]})

const styles = StyleSheet.create({
  plant: { backgroundColor: "transparent"},
  text_overflow: {
    overflowWrap: "break-word",
    width: "65%"
  },
  plant_name: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "900",
    fontSize: 17,
    // overflowWrap: "break-word"
  },
});

export { SelectPlantCard };
