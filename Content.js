

import React from 'react';
import { Menu, Box, Button, Text, Icon, IconButton, Center, Flex, ThreeDotsIcon } from 'native-base';
import { Pressable, StyleSheet } from 'react-native'
import { PlantCard } from "./Components/PlantCard"

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
    return <Box pos="relative" w="100%" h="120"
                bg="secondary.green">

                <Center pos="absolute" width="100%" h="100%" pb={2} justifyContent="flex-end">
                    <Text wordWrap="break-word" fontSize="4xl">My Eden</Text>
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

                            <Menu.Item _text={{color: "black"}}>
                                <Pressable onPress={() => navigation.navigate("AddPlantLandingPage")}>
                                    <Text color="black">Add Plant</Text>
                                </Pressable>
                            </Menu.Item>
                            <Menu.Item _text={{color: "black"}}>Delete Plant</Menu.Item>
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


function Content({ navigation }){
    // const { arr } = ["Aria", ]
    return <Box pos="relative" w="100%" h="120"
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



export { Content };