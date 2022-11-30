import React from "react";
import { StyleSheet } from "react-native";
import { Text, Flex, Box, Menu, Pressable, Center } from "native-base";
import Kabob from "../../assets/icons/kabob.svg";

const Header = ({ navigation }) => {
  return (
    <Box
      bgColor="secondary_green"
      paddingTop="70px"
      px="30px"
      paddingBottom="15px"
    >
      <Flex position="absolute" width="30%" top={0} right={0}>
        <Menu
          placement="bottom left"
          trigger={(triggerProps) => {
            return (
              <Pressable w="100%"
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Flex w="100%" justifyContent="flex-end" alignItems="center" pr={9} pt={9} pb={5} flexDirection="row">
                  <Kabob width={7} height={29} />
                </Flex>
              </Pressable>
            );
          }}
        >
          <Menu.Item>Edit My Eden</Menu.Item>
          <Menu.Item>
            <Pressable
              key="1"
              onPress={() =>
                navigation.navigate("AddPlantLandingPage", { progress: 1 })
              }
            >
              <Text color="black">Add New Plant</Text>
            </Pressable>
          </Menu.Item>
        </Menu>
      </Flex>
      <Box>
        <Text fontSize="34px" style={styles.page_title}>My Eden</Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  nav_button: {
    backgroundColor: "transparent",
  },
  page_title: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    // fontSize: "34px",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
});

export { Header };
