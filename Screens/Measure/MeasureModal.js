import React, { useState, useMemo, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import {
  Box,
  Center,
  ScrollView,
  View,
  Select,
  Button,
  Flex,
  Icon,
} from "native-base";
import { SelectPlantCard } from "../../Components/Measure/SelectPlantCard";
import AlertIcon from "../../assets/icons/alert.svg";
import myEdenPlants from "../../MockPlantData/myEdenData";

const MeasureModal = ({ navigation }) => {
  const [selected, setSelected] = useState(-1);
  const [myPlants, setMyPlants] = useState([]);

  useEffect(() => {
    // CALL BACKEND FOR PLANT INFORMATION
    // GET /get-plants-from-user-id WITH user-id from context
    // setMyPlants(response)

    setMyPlants(myEdenPlants);
  }, [myPlants.length]);

  const plantElements = useMemo(() => {
    return myPlants.map((elem, i) => (
      <SelectPlantCard
        i={i}
        iconNum={elem.iconId}
        name={elem.commonName}
        selected={selected}
        setSelected={setSelected}
      />
    ));
  }, [myPlants.length, selected]);

  return (
    <View style={styles.modal}>
      <Text style={styles.select_prompt}>Select the plant to measure.</Text>

      {/* Plants Box that Defines ScrollView Height */}
      <View style={styles.plants}>
        <ScrollView persistentScrollbar={true}>
          {/* Plants Flexbox */}
          <Flex w="100%" justifyContent="flex-start" flexWrap="wrap">
            {plantElements}
          </Flex>
        </ScrollView>
      </View>
      <Flex
        flexDirection="row"
        paddingLeft="30px"
        paddingRight="30px"
        marginBottom="24px"
      >
        <AlertIcon />
        <View marginLeft="10px">
          <Text style={styles.alert}>
            Place the device in the plant before proceeding. The timer will take
            measurements for 5 seconds once you press "Start".
          </Text>
        </View>
      </Flex>
      <Center w="100%">
        <Button
          minW="1/5"
          bg="secondary_green"
          // onPress={() =>{}}
          _disabled={{ opacity: 1, bg: "faded_green" }}
          isDisabled={selected == -1}
          onPress={() => {
            navigation.goBack();
            // plantIndex is the index of the plant in the Plant Context
            navigation.navigate("LiveMeasure", {
              plantName: myPlants[selected].commonName,
              plantId: myPlants[selected].id,
              plantIconId: myPlants[selected].iconId,
            });
          }}
        >
          <Text style={styles.button}>Start</Text>
        </Button>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 75,
  },
  select_prompt: {
    color: "#432D1E",
    fontWeight: "700",
    fontSize: 19,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
  plants: { height: "65%", width: "65%", marginTop: 25, marginBottom: 30 },
  alert: {
    textAlign: "center",
    color: "#B9422C",
    fontFamily: "SFProDisplay-Heavy",
  },
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "16",
    color: "white",
  },
});

export { MeasureModal };
