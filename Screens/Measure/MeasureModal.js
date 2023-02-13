import React, { useState, useMemo } from "react";
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
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { SelectPlantCard } from "../../Components/Measure/SelectPlantCard";
import AlertIcon from "../../assets/icons/alert.svg";

const MeasureModal = ({ navigation }) => {
  const [selected, setSelected] = useState(-1);
  const [Plants, dispatch] = usePlants();

  const plantElements = useMemo(() => {
    return Plants.map((elem, i) => (
      <SelectPlantCard
        i={i}
        iconNum={elem.iconId}
        name={elem.plantName}
        selected={selected}
        setSelected={setSelected}
      />
    ));
  }, [selected]);

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
        paddingLeft="40px"
        paddingRight="65px"
        marginBottom="24px"
      >
        <AlertIcon />
        <View marginLeft="10px">
          <Text style={styles.alert}>
            Place the device in the plant before proceeding
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
              plantIndex: selected,
            });
          }}
        >
          Start
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
});

export { MeasureModal };
