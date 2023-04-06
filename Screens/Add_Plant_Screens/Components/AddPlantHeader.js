import { React, useContext, useEffect, useState } from "react";
import { Box, Text, Center, Button } from "native-base";
import { ProgressSlider } from "../../../Components/Progress_Slider";
import { useRouteContext } from "../../../hooks/Contexts/Route_Context";

let isResetFetch = false;

export function AddPlantHeader() {
  const { navigation, route } = useRouteContext();
  const progress = (!route.params.progress) ? 1 : route.params.progress;

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
        {progress !== 3 && (
          <Button
            bg="transparent"
            _text={{
              fontSize: 19,
              color: "red.700",
            }}
            onPress={() => {
              if (progress === 1) {
                navigation.navigate("Home");
              } else if (progress === 2) {
                /**
                 * Toggle to notify first screen to reset fetch from plant.id if we navigate backwards
                 */
                isResetFetch = !isResetFetch;
                navigation.navigate("AddPlantLandingPage", {
                  progress: progress - 1,
                  resetFetch: isResetFetch,
                });
              } else {
                navigation.navigate("AddPlantLandingPage", {
                  progress: progress - 1,
                });
              }
            }}
          >
            {progress === 1 ? "Cancel" : "Back"}
          </Button>
        )}
      </Box>
      <Center w="100%" p={2} mt={16}>
        <Center mt={3}>
          <Text fontSize="4xl">Add Plant</Text>
        </Center>

        <Center w="100%" marginTop={5} marginBottom={5}>
          <ProgressSlider progress={progress} />
        </Center>
      </Center>
    </>
  );
}
