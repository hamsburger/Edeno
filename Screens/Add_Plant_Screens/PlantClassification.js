import React, { useState, useEffect } from "react";
import { Center, Text, View, Button } from "native-base";
import { StyleSheet } from "react-native";
import plantClassificationData from "../../MockPlantData/plantClassificationData";
import { usePlant } from "../../Hooks/Contexts/AddPlant_Context";

const styles = StyleSheet.create({
  identificationResult: {
    fontWeight: "400",
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontSize: 18,
    textAlign: "center",
  },
  plantName: {
    fontFamily: "SFProDisplay-Bold",
  },
  prompt: {
    fontWeight: "400",
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 16,
    color: "white",
  },
});

const PlantClassification = (props) => {
  const { photo, setContinue, navigation, progress } = props;
  const [showIdentification, setShowIdentification] = useState(true);
  const [chosenIdentification, setChosenIdentification] = useState(0);
  const [classificationResult, setClassificationResult] = useState([]);
  const [Plant, setPlant] = usePlant();

  useEffect(() => {
    // Get identification using photo
    // Call plant id here and store in plantClassificationData

    setClassificationResult(plantClassificationData);
  }, [classificationResult.length]);

  return (
    <View paddingY={"20px"}>
      {classificationResult.length == 0 ? null : (
        <Center>
          <Text style={styles.identificationResult}>
            We identified your plant as a{"\n"}
            <Text style={styles.plantName}>
              {classificationResult[chosenIdentification].commonName}
            </Text>
          </Text>
          <View marginTop={"50px"} marginBottom={"20px"}>
            <Text style={styles.prompt}>
              Are you satisfied with the identification result?{"\n"}
              Choose an option below.
            </Text>
          </View>
          <Button
            width="3/5"
            bg="secondary_green"
            onPress={() => {
              setPlant((prevPlant) => ({
                ...prevPlant,
                commonName: classificationResult[chosenIdentification].commonName,
              })); // Set the plant name
              navigation.navigate("AddPlantWithImage", {
                progress: progress + 1,
              });
            }}
          >
            <Text style={styles.button}>Yes, Proceed</Text>
          </Button>
          <Button marginTop={"15px"} width="3/5" bg="secondary_green">
            <Text style={styles.button}>No, Show More Options</Text>
          </Button>
          <Button
            marginTop={"15px"}
            width="3/5"
            bg="secondary_green"
            onPress={() =>
              navigation.navigate("AddPlantManually", {
                progress: 1,
              })
            }
          >
            <Text style={styles.button}>Add Manually Instead</Text>
          </Button>
        </Center>
      )}
    </View>
  );
};

export default PlantClassification;
