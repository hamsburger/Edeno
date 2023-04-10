import React from "react";
import { Flex, Text, View, Box, Button, Center } from "native-base";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  sectionDesc: {
    fontWeight: "400",
    fontFamily: "SFProDisplay-Regular",
    fontStyle: "normal",
    fontSize: 14,
  },
  sectionTitle: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 17,
    textAlign: "center",
  },
  ndviClass: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 14,
    textAlign: "left",
  },
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 16,
    color: "white",
  },
  skip: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 16,
    color: "#597F51",
  },
});

const NDVIInstructions = ({ route, navigation }) => {
  const { photo, plantName } = route.params;
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      paddingRight="5"
      paddingLeft="5"
    >
      <Box position="absolute" left={2} top={43}>
        <Button
          bg="transparent"
          _text={{
            fontSize: 19,
            color: "#B9422C",
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Cancel
        </Button>
      </Box>
      <View>
        <Text style={styles.sectionTitle}>NDVI Assessment</Text>
        <View marginTop={"5px"} marginBottom="15px">
          <Text style={styles.sectionDesc}>
            The normalized difference vegetation index (NDVI) detects and
            quantifies the presence of live green vegetation using this
            reflected light in the visible and near-infrared bands. It outputs a
            value between -1 and 1 to indicate the healthiness of your plant.
          </Text>
        </View>
        <View paddingHorizontal={15}>
          <Flex
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems="center"
            marginBottom={"11px"}
          >
            <View marginRight={"20px"}>
              <Image
                source={require("../../assets/icons/ndvi-classes/class1.png")}
              />
            </View>
            <Text style={styles.ndviClass}>
              -1 to 0: Dead Plant or Inanimate Object
            </Text>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems="center"
            marginBottom={"11px"}
          >
            <View marginRight={"20px"}>
              <Image
                source={require("../../assets/icons/ndvi-classes/class2.png")}
              />
            </View>
            <Text style={styles.ndviClass}>0 to 0.33: Unhealthy Plant</Text>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems="center"
            marginBottom={"11px"}
          >
            <View marginRight={"20px"}>
              <Image
                source={require("../../assets/icons/ndvi-classes/class3.png")}
              />
            </View>
            <Text style={styles.ndviClass}>
              0.33 to 0.66: Moderately Healthy Plant
            </Text>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems="center"
            marginBottom={"15px"}
          >
            <View marginRight={"20px"}>
              <Image
                source={require("../../assets/icons/ndvi-classes/class4.png")}
              />
            </View>
            <Text style={styles.ndviClass}>0.66 - 1: Very Healthy Plant</Text>
          </Flex>
        </View>
        <Text style={styles.ndviClass}>Instructions: </Text>
        <View marginTop={"5px"} marginBottom="15px">
          <Text style={styles.sectionDesc}>
            The normalized difference vegetation index (NDVI) detects and
            quantifies the presence of live green vegetation using this
            reflected light in the visible and near-infrared bands. It outputs a
            value between -1 and 1 to indicate the healthiness of your plant.
          </Text>
        </View>
        <Center>
          <Button
            marginTop={"15px"}
            marginBottom={"18px"}
            width="3/5"
            bg="secondary_green"
            onPress={() => {
              // TURN SENSOR ON
              // TAKE NDVI MEASUREMENTS

              navigation.navigate("NDVILiveMeasure", {
                plantName: plantName,
                photo: photo,
              });
            }}
          >
            <Text style={styles.button}>Start Sensor</Text>
          </Button>
        </Center>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Results", {
              showNDVI: false,
              photo: photo,
              plantName: plantName,
            });
          }}
        >
          <Center>
            <Text style={styles.skip}>Skip NDVI Assessment</Text>
          </Center>
        </TouchableOpacity>
      </View>
    </Flex>
  );
};

export default NDVIInstructions;
