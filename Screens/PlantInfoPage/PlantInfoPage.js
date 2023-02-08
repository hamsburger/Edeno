import { React } from "react";
import { StyleSheet, Image } from "react-native";
import {
  View,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Menu,
  Box,
} from "native-base";
import Kabob from "../../assets/icons/kabob.svg";

const PlantInfoPage = ({ route, navigation }) => {
  const { plantInfo } = route.params;

  const styles = StyleSheet.create({
    plantImage: { height: 170, opacity: 0.7 },
    plantName: {
      color: "white",
      fontWeight: "700",
      textAlign: "center",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
    },
    plantDates: {
      color: "white",
      textAlign: "center",
      fontWeight: "600",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
    },
  });

  // This is mock data for now. Will fix when i know format of what actual data looks like.
  const mockPlantData = {
    dateLastMeasured: "1 week ago",
    dateAdded: "May 2022",
  };

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <Image
        style={styles.plantImage}
        source={require("../../assets/plantImage.png")}
      ></Image>
      <Box
        bgColor="secondary_green"
        paddingTop="70px"
        px="30px"
        marginTop={-7}
        paddingBottom="15px"
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
      >
        <Flex position="absolute" width="30%" top={0} right={0}>
          <Menu
            placement="bottom left"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  w="100%"
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Flex
                    w="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                    pr={9}
                    pt={9}
                    pb={5}
                    flexDirection="row"
                  >
                    <Kabob width={7} height={29} />
                  </Flex>
                </Pressable>
              );
            }}
          >
            <Menu.Item>Delete</Menu.Item>
          </Menu>
        </Flex>
        <Box>
          <Text fontSize="34px" style={styles.plantName}>
            {plantInfo.plantName}
          </Text>
          <Text fontSize="14px" style={styles.plantDates}>
            Last Measured: {mockPlantData.dateLastMeasured}
          </Text>
          <Text fontSize="14px" style={styles.plantDates}>
            Added: {mockPlantData.dateAdded}
          </Text>
        </Box>
      </Box>

      <View></View>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
    </ScrollView>
  );
};

export { PlantInfoPage };
