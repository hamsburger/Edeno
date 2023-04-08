import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Image, Animated } from "react-native";
import { View, Text, Box, Button, Flex, Center } from "native-base";
import { plant_icons } from "../../Constants/StaticPlantIconImages";
import { useFirebaseDatabase } from "../../Hooks/Contexts/Firebase_Context";
import LiveIcon from "../../assets/icons/live-circle.svg";

const LiveMeasure = ({ route, navigation }) => {
  const { plantName, plantId, plantIconId } = route.params;
  const [readings, setReadings] = useState({});
  const db = useFirebaseDatabase();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [countdown, setCountdown] = useState(5000);
  const [timerId, setTimerId] = useState(null);
  const [lastFetchedMeasurement, setLastFetchedMeasurement] = useState(null);

  const fetchData = () => {
    // fetch data from the database and save it
    console.log("Fetching data...");
    // setLastFetchedMeasurement(apiResponse)
  };

  const startTimer = () => {
    setTimerId(
      setInterval(() => {
        setCountdown((countdown) => countdown - 1000);
      }, 1000)
    );
  };

  const resetTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
    setCountdown(5000);
  };

  useEffect(() => {
    // start timer
    startTimer(); // Start the timer on initial mount

    db.listenForChildUpdate("readings", setReadings);

    // /* Get readings every five seconds */
    // const interval = setInterval(
    //   () =>
    //     db.pushToRealTimeDatabase("readings", {
    //       Light: Math.floor(Math.random() * 135) + [], // + [] is a shorthand for string conversion
    //       Moisture: Math.floor(Math.random() * 10) + [],
    //       PH: Math.floor(Math.random() * 10) + [],
    //       Temp: Math.floor(Math.random() * 50 - 25) + [],
    //       Humidity: Math.floor(Math.random() * 50 - 25) + [],
    //     }),
    //   5000
    // );

    // Code for animating live icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      // clearInterval(interval);
      db.cleanListeners();
    };
  }, []);

  useEffect(() => {
    if (timerId) {
      fetchData();
    }
  }, [timerId]);

  useEffect(() => {
    if (countdown === 0) {
      resetTimer();
    }
  }, [countdown]);

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
        <Text style={styles.plant_name}>{plantName}</Text>
        <Image
          style={{ height: 144, width: 144, marginBottom: 46 }}
          source={plant_icons[plantIconId]}
        />
        <Flex flexDirection="row" alignItems="center">
          <Animated.View style={{ opacity: fadeAnim }}>
            <LiveIcon />
          </Animated.View>
          <Text style={styles.live_reading}>Live Readings</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>pH Level:</Text>
          <Text style={styles.measurement}>{readings.PH} μS/cm</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Soil Moisture:</Text>
          <Text style={styles.measurement}>{readings.Moisture}%</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Humidity:</Text>
          <Text style={styles.measurement}>{readings.humidity}%</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Temperature:</Text>
          <Text style={styles.measurement}>{readings.Temp}°C</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text style={styles.measurement_title}>Light Intensity:</Text>
          <Text style={styles.measurement}>{readings.Light} LUX</Text>
        </Flex>
      </View>
      <View marginTop={"60px"}>
        {timerId ? (
          <Text style={styles.continue_prompt}>{`Continue in ${
            countdown / 1000
          }...`}</Text>
        ) : null}

        <Flex
          marginTop={"10px"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            minW="1/5"
            bg="secondary_green"
            isDisabled={timerId}
            onPress={startTimer}
            marginBottom={"10px"}
          >
            Re-take Measurements
          </Button>
          <Button
            minW="1/5"
            bg="secondary_green"
            isDisabled={timerId}
            onPress={() => {
              // persist whatever is in lastFetchedMeasurement to db in SavedReadings

              navigation.navigate("PlantInfoPage", {
                plantId: plantId,
                plantIconId: plantIconId,
              });
            }}
          >
            Save & Continue
          </Button>
        </Flex>
      </View>
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
  continue_prompt: {
    fontSize: 17,
    fontFamily: "SFProDisplay-Bold",
    textAlign: "center",
  },
});

export { LiveMeasure };
