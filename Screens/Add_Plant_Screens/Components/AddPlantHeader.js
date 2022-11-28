import { React, useContext, useEffect, useState } from 'react';
import { Box, Text, Center, Flex, Button } from 'native-base';
import { ProgressSlider } from '../../../Components/Progress_Slider';
import { RouteContext } from "../AddPlantLandingPage";

let isResetFetch = false;

export function AddPlantHeader(){
    const { navigation, route } = useContext(RouteContext);
    const progress = route.params.progress;

    return <Flex w="100%" p={2} flexDirection="row" justifyContent="center" flexWrap="wrap">
        <Box w="100%" pl={3}>
            <Button bg="transparent" _text={{
                fontSize: "19px",
                color: "red.700"
            }} onPress={() => {
                    if(progress === 1) { 
                        navigation.navigate("Home")
                    } else if (progress === 2){
                        /** 
                         * Toggle to notify first screen to reset fetch from plant.id if we navigate backwards
                        */
                        isResetFetch = !isResetFetch;
                        navigation.navigate("AddPlantLandingPage", {"progress": progress-1, "resetFetch" : isResetFetch});
                    } else {
                        navigation.navigate("AddPlantLandingPage", {"progress": progress-1})
                    }
                
                }}>
                <Text fontSize="19px" color="red.700">{
                    (progress === 1) && "Cancel" || "Back"
                }</Text>
            </Button>
        </Box>
        
        <Center mt={3}>
            <Text fontSize="4xl">Add Plant</Text> 
        </Center> 

        <Box w="100%" alignItems="center" marginTop={5} marginBottom={5}>
            <ProgressSlider progress={progress}/> 
        </Box>
    </Flex>
}