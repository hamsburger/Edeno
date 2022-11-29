import { React, useState, createContext, useEffect } from "react";
import { Box, Button, Center } from "native-base";
import { PlantId_Fetch } from "./PlantId_Fetch";
import { AddPlantHeader } from "./Components/AddPlantHeader";
import { Icon_Selection } from "./Icon_Selection";
import { Add_Confirmation } from "./Add_Confirmation";
import { RouteProvider } from "../../Hooks/Contexts/Route_Context";

export function AddPlantLandingPage(props) {
  const { route, navigation } = props;
  const [canContinue, setContinue] = useState(false);
  const progress = !route.params.progress ? 1 : route.params.progress;

  return (
    <RouteProvider route={route} navigation={navigation}>
      <Box h="100%" w="100%" bg="white" pt={6}>
        <AddPlantHeader />
        {progress === 1 && <PlantId_Fetch setContinue={setContinue} />}
        {progress === 2 && <Icon_Selection setContinue={setContinue} />}
        {progress === 3 && <Add_Confirmation setContinue={setContinue} />}

        {/* Button at bottom to push landing page onto history stack, but with progress + 1 */}
        <Center w="100%">
          <Button
            minW="1/5"
            onPress={() =>
              progress === 3
                ? navigation.navigate("Home")
                : navigation.navigate("AddPlantLandingPage", {
                    progress: progress + 1,
                  })
            }
            bg="secondary.green"
            _disabled={{ opacity: 1, bg: "secondary.fadedGreen" }}
            isDisabled={!canContinue}
          >
            {(progress == 3 && "Return to Home") || "Next"}
          </Button>
        </Center>
      </Box>
    </RouteProvider>
  );
}
