import { React, useState, createContext, useEffect } from 'react';
import { Box, Button, Center } from 'native-base';
import { PlantId_Fetch } from "./PlantId_Fetch";
import { AddPlantHeader } from './Components/AddPlantHeader';
import { Icon_Selection } from './Icon_Selection';
import { Add_Confirmation } from './Add_Confirmation';

export const RouteContext = createContext(null);

export function AddPlantLandingPage(props){
    const { route, navigation } = props;
    const [isFetched, setFetched] = useState(true);
    const progress = route.params.progress;

    /** Update whether we should fetch from plant.id every time we go to a different add plant screen */
    useEffect(() => { 
        if (route.params.progress === 1) setFetched(false);
        else setFetched(true);
    }, [route.params.resetFetch, route.params.progress])
    

    return <RouteContext.Provider value={{route, navigation}}>
        <Box h="100%" w="100%" bg="white" pt={6}>
            <AddPlantHeader/>
            {(progress === 1) && <PlantId_Fetch setFetched={setFetched}/>}
            {(progress === 2) && <Icon_Selection/>}
            {(progress === 3) && <Add_Confirmation/>}

            {/* Button at bottom to push landing page onto history stack, but with progress + 1 */}
            <Box w="100%" alignItems="center">
                <Button minW="1/5" onPress={() => (progress === 3) ? navigation.navigate("Home") : 
                    navigation.push("AddPlantLandingPage", {"progress": progress+1})
                } 
                    bg="secondary.green" _disabled={{opacity : 1, bg: "secondary.fadedGreen"}} isDisabled={!isFetched}>
                    {
                        (progress == 3)  && "Return to Home" || "Next"
                    }
                </Button> 
            </Box>
        </Box>
    </RouteContext.Provider> 
}