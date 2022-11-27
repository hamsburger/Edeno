import React from "react";
import {
  Menu,
  Button,
  Text,
  HamburgerIcon,
  Container,
  Center,
  useColorMode,
  useColorModeValue,
} from "native-base";
import { Pressable, StyleSheet } from "react-native";

function Content() {
  const bg = useColorModeValue("edeno_green.0", "black");
  const colourTheme = useColorModeValue("Dark", "Light");

  const { colorMode, toggleColorMode } = useColorMode();

  // const { arr } = ["Aria", ]
  return (
    <Center>
      <Menu
        bg="white"
        placement="bottom"
        offset={30}
        w={1300}
        shadow={0}
        padding={0}
        trigger={(triggerProps) => {
          return (
            <Button
              bg="white"
              h="100"
              w="1200"
              _pressed={{ bg: "primary.200" }}
              {...triggerProps}
            >
              <HamburgerIcon top="4" size="7" />
            </Button>
          );
        }}
      >
        <Menu.Item bg={bg} _pressed={{ bg: "blue.500" }}>
          <Text
            _dark={{ color: "edeno_green.0" }}
            _light={{ color: "coolGray.800" }}
          >
            Aria
          </Text>
        </Menu.Item>
        <Menu.Item bg={bg} _pressed={{ bg: "green.500" }}>
          <Text
            _dark={{ color: "warmGray.50" }}
            _light={{ color: "coolGray.800" }}
          >
            Aria
          </Text>
        </Menu.Item>
        <Menu.Item bg={bg} _pressed={{ bg: "yellow.500" }}>
          <Text
            _dark={{ color: "warmGray.50" }}
            _light={{ color: "coolGray.800" }}
          >
            Aria
          </Text>
        </Menu.Item>
        <Menu.Item bg={bg} _pressed={{ bg: "yellow.500" }}>
          <Button onPress={toggleColorMode} h={10}>
            {colourTheme}
          </Button>
        </Menu.Item>
      </Menu>
    </Center>
  );
}

const styles = StyleSheet.create({
  /**
   * Stylesheet styles take precedence over utility-first styles (Prop styles you see configured
   * above).
   */
  menu: {
    backgroundColor: "green",
  },
});

export { Content };
