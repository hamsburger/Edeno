import { React } from 'react';
import { Flex, Box, Text } from 'native-base';
import { Image } from 'react-native';
import { plant_icons } from '../Constants/StaticPlantIconImages';

export function PlantCard({ plantInfo }){
    const { iconId, plantName } = plantInfo;
    return <Flex w="50%" justifyContent="flex-start" 
          flexDirection="row" flexWrap="nowrap">
            <Image source={plant_icons[iconId]}
            style={{height: 48, width: 48}}/>
            <Box w="100%">
                <Text fontSize="lg">{plantName}</Text>
            </Box>
    </Flex>   
}