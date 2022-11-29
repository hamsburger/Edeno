

import React from 'react';
import { Menu, Box, Button, Text, Pressable, Center, Flex, ThreeDotsIcon } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native'
import { PlantCard } from "./Components/PlantCard"
import { Header } from 'react-native/Libraries/NewAppScreen';
import { usePlants } from './Contexts/Plant_Context';

const styles = StyleSheet.create({
    /**
     * Stylesheet styles take precedence over utility-first styles (Prop styles you see configured
     * above).
     */
    iconFlip : { 
        transform: [{rotate: "90deg"}]
    }
});

const HeaderFinal = ({ navigation }) => {
    return <Box position="relative" w="100%" h="120"
    bg="secondary.green">

    <Center pos="absolute" width="100%" h="100%" pb={2} justifyContent="flex-end">
        <Text wordWrap="break-word" fontSize="4xl" color="white">My Eden</Text>
    </Center>
    <Box position="absolute" top={0} right={0} padding={2} pt={6}>
        <Menu
            bg="white"

            placement="bottom left"
            offset={30}
            shadow={0}
            trigger={(triggerProps) => {
            {/* Absolute Positioned Vertical Three-Dot Icon */}
            return <Button
                bg="transparent"    
                {...triggerProps}
                _pressed={
                    {bg : "secondary.green"}
                }
            >   
                <ThreeDotsIcon style={styles.iconFlip} size="6" color="white"/>
            </Button>
            }}
            >
                <Menu.Item key="1">
                    <Pressable key="1" onPress={() => navigation.navigate("AddPlantLandingPage", {progress: 1})}>
                        <Text color="black">Add Plant</Text>
                    </Pressable>
                </Menu.Item>
                <Menu.Item key="2">Delete Plant</Menu.Item>
        </Menu>
    </Box>
</Box>

}

// const HeaderDraft = () => {
//     return <Center>
//     <Flex w="100%"
//             h="120"
//             bg="secondary.green"
//             flexDirection="row"
//             justifyContent="space-between"
//             alignItems="center"
//             p={3}>
//         <Flex h="100%" flexGrow={2} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
//             <Text wordWrap="break-word" fontSize="4xl">My Eden</Text>
//         </Flex>
//         <Menu
//             bg="white"
//             placement="bottom right"
//             offset={30}
//             shadow={0}
//             trigger={(triggerProps) => {
//             return <Flex flexGrow={1}> <Button 
//                 borderWidth="0"
//                 {...triggerProps}
//                 bg="secondary.green"
//                 _pressed={
//                     {bg : "secondary.green"}
//                 }
//             >   
//                 <ThreeDotsIcon style={styles.iconFlip} size="5" color="white"/>
//             </Button>
//             </Flex>
//             }}
//             >
//                 <Menu.Item color="blak"><Text>Aria</Text></Menu.Item>
//                 <Menu.Item color="black">Nunito Sans</Menu.Item>
//                 <Menu.Item color="black">Roboto</Menu.Item>
//         </Menu>
//     </Flex>
//     </Center>
// }


function Content(props){
    const [ Plants, dispatch ] = usePlants();

    console.log(Plants);
    // const { arr } = ["Aria", ]
    return <Box w="100%">
        <HeaderFinal {...props}></HeaderFinal>
        <ScrollView>
        <Flex w="100%" justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
                { Plants.map((elem) => <PlantCard plantInfo={elem}/>) } 
        </Flex>
        </ScrollView>
    </Box>
}



export { Content };