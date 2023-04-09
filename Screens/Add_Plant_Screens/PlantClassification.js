import React, { useState, useEffect } from "react";
import { Center, Text, View, Button } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import plantClassificationData from "../../MockPlantData/plantClassificationData";
import { usePlant } from "../../Hooks/Contexts/AddPlant_Context";

const styles = StyleSheet.create({
  identificationResult: {
    fontWeight: "400",
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontSize: "18px",
    textAlign: "center",
  },
  plantName: {
    fontFamily: "SFProDisplay-Bold",
  },
  prompt: {
    fontWeight: "400",
    fontFamily: "SFProDisplay-Regular",
    fontStyle: "normal",
    fontSize: "16px",
    textAlign: "center",
  },
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "16",
    color: "white",
  },
  options: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "19px",
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
    <View paddingY={"20px"} paddingX={"15px"}>
      {classificationResult.length == 0 ? null : showIdentification ? (
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
                id: classificationResult[chosenIdentification].commonName,
                plantName:
                  classificationResult[chosenIdentification].commonName,
              })); // Set the plant name
              navigation.navigate("AddPlantWithImage", {
                progress: progress + 1,
              });
            }}
          >
            <Text style={styles.button}>Yes, Proceed</Text>
          </Button>
          <Button
            marginTop={"15px"}
            width="3/5"
            bg="secondary_green"
            onPress={() => {
              setShowIdentification(false);
            }}
          >
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
      ) : (
        <Center>
          <Text style={styles.identificationResult}>
            We also think your plant looks similar to these plants.
          </Text>
          <View marginTop={"50px"} marginBottom={"20px"}>
            <Text style={styles.prompt}>Choose an option below.</Text>
          </View>
          <View>
            {classificationResult
              .filter(
                (curr) =>
                  curr.commonName !=
                  classificationResult[chosenIdentification].commonName
              )
              .map((curr) => (
                <View paddingY={"15px"}>
                  <TouchableOpacity
                    onPress={() => {
                      const chosen = classificationResult.findIndex((elem) => {
                        return curr.commonName == elem.commonName;
                      });

                      setChosenIdentification(chosen);
                      setShowIdentification(true);
                    }}
                  >
                    <Text style={styles.options}>{curr.commonName}</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </Center>
      )}
    </View>
  );
};

export default PlantClassification;
