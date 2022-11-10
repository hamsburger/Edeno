

import React from 'react';
import { Menu, Button, Text, HamburgerIcon, Container, Center} from 'native-base';
import { Pressable, StyleSheet } from 'react-native'

function Content() {

    // const { arr } = ["Aria", ]
    return <Center>
        <Menu
            bg="white"
            placement="bottom"
            offset={30}
            w={1300}
            shadow={0}
            padding={0}
            trigger={(triggerProps) => {
                return <Button 
                        bg="white"
                        h="100"
                        w="1200"
                        _pressed={
                            {bg : "primary.200"}
                        }
                        {...triggerProps}
                        >
                            <HamburgerIcon top="4" size="7"/>
                        </Button>
            }}
        >
            <Menu.Item bg="blue.300" _pressed={ {bg : "blue.500"} }><Text>Aria</Text></Menu.Item>
            <Menu.Item bg="green.300" _pressed={ {bg : "green.500"} }>Nunito Sans</Menu.Item>
            <Menu.Item bg="yellow.300" _pressed={ {bg : "yellow.500"} }>Roboto</Menu.Item>
        </Menu>
    </Center>
}

const styles = StyleSheet.create({
    /**
     * Stylesheet styles take precedence over utility-first styles (Prop styles you see configured
     * above).
     */
    menu: {
        backgroundColor: "green"
    }
});

export { Content };