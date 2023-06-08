import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Flex, Box, Menu, Pressable, Center } from "native-base";
import Kabob from "../../assets/icons/kabob.svg";
import Add from "../../assets/icons/add.svg";

const Header = ({ navigation }) => {
  return (
    <Box
      bgColor="secondary_green"
      paddingTop="70px"
      px="30px"
      paddingBottom="15px"
    >
      <Flex justifyContent="flex-end" alignItems="center" flexDirection="row">
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPlantLandingPage")}
        >
          <Add width={29} height={29} />
        </TouchableOpacity>
      </Flex>
      <Box>
        <Text fontSize="34px" style={styles.page_title}>
          My Eden
        </Text>
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
    // fontSize: 34,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
});

export { Header };
