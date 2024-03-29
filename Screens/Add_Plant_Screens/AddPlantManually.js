import { React, useState, createContext, useEffect } from "react";
import { Box, Button, Center } from "native-base";
import { PlantId_Fetch_Manual } from "./PlantId_Fetch_Manual";
import { AddPlantHeader } from "./Components/AddPlantHeader";
import { Icon_Selection } from "./Icon_Selection";
import { Add_Confirmation } from "./Add_Confirmation";
import { Add_Nickname } from "./Add_Nickname";
import { RouteProvider } from "../../Hooks/Contexts/Route_Context";
import { PlantClassification } from "./PlantClassification";

export function AddPlantManually(props) {
  const { route, navigation } = props;
  const [canContinue, setContinue] = useState(false);
  const progress = !route.params.progress ? 1 : route.params.progress;
  return (
      <RouteProvider route={route} navigation={navigation}>
        <Box h="100%" w="100%" bg="white" pt={6}>
          <AddPlantHeader />
          {progress === 1 && <PlantId_Fetch_Manual setContinue={setContinue} />}
          {progress === 2 && <Add_Nickname setContinue={setContinue} />}
          {progress === 3 && <Icon_Selection setContinue={setContinue} />}
          {progress === 4 && <Add_Confirmation setContinue={setContinue} />}

          {/* Button at bottom to push landing page onto history stack, but with progress + 1 */}
          <Center w="100%">
            <Button
              minW="1/5"
              bg="secondary_green"
              onPress={() =>
                progress === 4
                  ? navigation.navigate("Home")
                  : navigation.navigate("AddPlantManually", {
                      progress: progress + 1,
                    })
              }
              _disabled={{ opacity: 1, bg: "faded_green" }}
              isDisabled={!canContinue}
            >
              {(progress == 4 && "Return to Home") || "Next"}
            </Button>
          </Center>
        </Box>
      </RouteProvider>
  );
}
