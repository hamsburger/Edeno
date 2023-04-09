import React from "react";
import { Flex, Text, View, Box, Button, Center } from "native-base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionDesc: {
    fontWeight: "400",
    fontFamily: "SFProDisplay-Regular",
    fontStyle: "normal",
    fontSize: "14px",
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "17",
    textAlign: "center",
  },
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "16",
    color: "white",
  },
});

const NDVILiveMeasure = ({ route, navigation }) => {
  const { plantName, photo } = route.params;
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
            fontSize: "19px",
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
        <Text style={styles.sectionTitle}>NDVI Assessment In Progress...</Text>
        <View marginTop={"5px"} marginBottom="15px">
          <Text style={styles.sectionDesc}>
            In a well-lit area, hold the Edeno device with the camera facing
            towards the plant approximately 1 meter away from the plant to
            capture as much vegetation as possible. {"\n\n"}When you want to
            take the picture, press capture.
          </Text>
        </View>

        <Center>
          <Button
            marginTop={"15px"}
            marginBottom={"18px"}
            width="3/5"
            bg="secondary_green"
            onPress={() => {
              // STOP SENSOR

              navigation.navigate("Results", {
                showNDVI: true,
                photo: photo,
                plantName: plantName,
              });
            }}
          >
            <Text style={styles.button}>Capture</Text>
          </Button>
        </Center>
      </View>
    </Flex>
  );
};

export default NDVILiveMeasure;
