import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text, Box, Button, Flex, Center } from "native-base";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { plant_icons } from "../../Constants/StaticPlantIconImages";
import { useFirebaseDatabase } from "../../Hooks/Contexts/Firebase_Context";
import LiveIcon from "../../assets/icons/live-circle.svg";

const LiveMeasure = ({ route, navigation }) => {
  const { plantIndex } = route.params;
  const [Plants, dispatch] = usePlants();
  const [readings, setReadings] = useState({});
  const db = useFirebaseDatabase();

  useEffect(() => {
    db.listenForChildUpdate("readings", setReadings);

    /* Get readings every five seconds */
    const interval = setInterval(
      () =>
        db.pushToRealTimeDatabase("readings", {
          Light: Math.floor(Math.random() * 135) + [], // + [] is a shorthand for string conversion
          Moisture: Math.floor(Math.random() * 10) + [],
          PH: Math.floor(Math.random() * 10) + [],
          Temp: Math.floor(Math.random() * 50 - 25) + [],
          Humidity: Math.floor(Math.random() * 50 - 25) + [],
        }),
      5000
    );

    return () => {
      clearInterval(interval);
      db.cleanListeners();
    };
  }, []);

  console.log(readings);
  return (
    <View>
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
      <View style={styles.container}>
        <Text style={styles.plant_name}>{Plants[plantIndex].plantName}</Text>
        <Image
          style={{ height: 144, width: 144, marginBottom: 46 }}
          source={plant_icons[Plants[plantIndex].iconId]}
        />
        <Flex flexDirection="row" alignItems="center">
          <LiveIcon />
          <Text style={styles.live_reading}>Live Readings</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>pH Level:</Text>
          <Text style={styles.measurement}>{readings.PH}</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Soil Moisture:</Text>
          <Text style={styles.measurement}>{readings.Moisture}</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Humidity:</Text>
          <Text style={styles.measurement}>{readings.Humidity}</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Temperature:</Text>
          <Text style={styles.measurement}>{readings.Temp}</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Light Intensity:</Text>
          <Text style={styles.measurement}>{readings.Light} LUX</Text>
        </Flex>
      </View>
      <Center w="100%" marginTop={100}>
        <Button
          minW="1/5"
          bg="secondary_green"
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Done
        </Button>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center", marginTop: 60 },
  plant_name: {
    color: "#597F51",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 28,
    paddingTop: 64,
    paddingBottom: 47,
  },
  live_reading: {
    color: "#432D1E",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 19,
    marginLeft: 10,
  },
  measurement_title: {
    paddingTop: 16,
    marginRight: 29,
    color: "#432D1E",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 17,
  },
  measurement: {
    paddingTop: 16,
    color: "#432D1E",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 17,
  },
});

export { LiveMeasure };
