import { React, useState, createContext, useEffect } from "react";
import { Box, Button, Center, Text } from "native-base";
import { StyleSheet } from "react-native";
import { AddPlantHeader } from "./Components/AddPlantHeader";
import { Icon_Selection } from "./Icon_Selection";
import { Add_Nickname } from "./Add_Nickname"
import { Add_Confirmation } from "./Add_Confirmation";
import { RouteProvider } from "../../Hooks/Contexts/Route_Context";

const AddPlantLandingPage = ({ route, navigation }) => {
  return (
    <>
      <Box
        position="absolute"
        top={10}
        left={2}
        w="100%"
        pl={2}
        justifyContent="flex-start"
        flexDirection="row"
      >
        <Button
          bg="transparent"
          _text={{
            fontSize: 19,
            color: "red.700",
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Cancel
        </Button>
      </Box>
      <Center w="100%" p={2} mt={20}>
        <Center mt={3}>
          <Text fontSize="4xl">Add Plant</Text>
        </Center>
      </Center>
      <Center width="100%" marginTop={"84px"} mb={10}>
        <Center width="90%">
          <Text fontSize="lg" fontWeight="bold">
            {" "}
            Let's Find Your Plant{" "}
          </Text>
          <Text fontSize="sm">Choose an option below.</Text>
        </Center>
      </Center>
      <Center w="100%" marginTop={"51px"}>
        <Button
          width="3/5"
          bg="secondary_green"
          onPress={() =>
            navigation.navigate("TakePictureInstruction", {
              type: "plant-identification",
            })
          }
        >
          <Text style={styles.button}>Take a Picture and Identify</Text>
        </Button>
        <Button
          marginTop={"26px"}
          width="3/5"
          bg="secondary_green"
          onPress={() =>
            navigation.navigate("AddPlantManually", {
              progress: 1,
            })
          }
        >
          <Text style={styles.button}>Add Manually</Text>
        </Button>
      </Center>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 16,
    color: "white",
  },
});

export default AddPlantLandingPage;
