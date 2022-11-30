import { React, useMemo, useState, useRef } from "react";
import { Image, ScrollView } from "react-native";
import { Text, Flex, Box, Button, Center, Select } from "native-base";
import { plant_icons } from "../../Constants/StaticPlantIconImages";
import { usePlant } from "../../Hooks/Contexts/AddPlant_Context";

export function Icon_Selection(props) {
  // Code can be optimized. plant_icons.map does not have to be called every single time

  const [Plant, setPlant] = usePlant();
  const [pressed, setPressed] = useState(-1);
  const { setContinue } = props;

  const image_icons = useMemo(
    () =>
      plant_icons.map((elem, i) => {
        return (
          <Button
            key={i}
            bg={pressed === i ? "cultured_grey" : "transparent"}
            startIcon={
              <Image source={elem} style={{ height: 64, width: 64 }} />
            }
            onPress={() => {
              setPressed(i);
              setPlant((prevPlant) => ({ ...prevPlant, iconId: i }));
              setContinue(true);
            }}
            _pressed={{ bg: "cultured_grey" }}
          ></Button>
        );
      }),
    [pressed]
  );

  return (
    <Box
      w="100%"
      h="60%"
      flexDirection="column"
      justifyContent="space-around"
      mb={5}
    >
      <Center>
        <Text fontSize="lg" fontWeight="bold">
          Choose an icon for your {Plant.plantName}
        </Text>
      </Center>
      <ScrollView>
        <Flex
          w="100%"
          justifyContent="flex-start"
          flexDirection="row"
          flexWrap="wrap"
        >
          {image_icons}
        </Flex>
      </ScrollView>
    </Box>
  );
}
