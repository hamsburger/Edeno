import React from "react";
import { Text, StyleSheet } from "react-native";
import { Box, Menu, Pressable } from "native-base";
import Kabob from "../../assets/icons/kabob.svg";

const Header = () => {
  return (
    <Box
      bgColor="secondary_green"
      paddingTop="50px"
      px="30px"
      paddingBottom="15px"
    >
      <Box alignSelf="flex-end">
        <Menu
          placement="bottom left"
          w="150px"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Kabob width={7} height={29} />
              </Pressable>
            );
          }}
        >
          <Menu.Item>Edit My Eden</Menu.Item>
          <Menu.Item>Add New Plant</Menu.Item>
        </Menu>
      </Box>
      <Text style={styles.page_title}>My Eden</Text>
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
    fontSize: "34px",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
});

export { Header };
