import { React, useEffect, useState } from "react";
import { View, Text, Flex, ScrollView, Box, Center, Button } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  diseaseData,
  NDVIAssessmentData,
} from "../../MockPlantData/healthAssessmentData";

const Results = ({ route, navigation }) => {
  const { showNDVI, photo, plantName, NDVIReadings } = route.params;
  const [ndviResult, setNDVIResult] = useState({});
  const [diseaseResult, setDiseaseResult] = useState({});

  function sendImage() {
    console.log(photo.uri);
    fetch(photo.uri)
      .then((response) => response.blob())
      .then((blob) => {
        const formData = new FormData();
        formData.append("image", blob);
        console.log("helloooo", blob);

        fetch(
          "https://us-central1-edeno-b66fc.cloudfunctions.net/healthAssessment",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            setDiseaseResult(data);
          })
          .catch((err) => {
            console.log("error:", err);
          });
      })
      .catch((error) => {});
  }

  useEffect(() => {
    // use `photo` to get disease results
    sendImage();

    // if showNDVI = true, get latest NDVI results
  }, [Object.keys(ndviResult), Object.keys(diseaseResult)]);

  console.log(ndviResult)
  return (
    <ScrollView>
      <Box
        bgColor="secondary_green"
        paddingTop="85px"
        px="30px"
        paddingBottom="15px"
      >
        <Box>
          <Text fontSize="37px" style={styles.page_title}>
            Health Assessment
          </Text>
          <Text marginTop={"10px"} style={styles.plantName}>
            {plantName}
          </Text>
        </Box>
      </Box>
      <View
        paddingTop={"40px"}
        paddingBottom={"40px"}
        paddingLeft={"20px"}
        paddingRight={"20px"}
      >
        {diseaseResult.isHealthy ? (
          <View>
            <Text style={styles.resTitle}>Your plant looks healthy!</Text>
            <View marginTop={"10px"}>
              <Text style={styles.resDesc}>
                No diseases were detected for your plant. {"\n"} Great job!
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.resTitle}>We found something...</Text>
            <View marginTop={"10px"}>
              <Text style={styles.resDesc}>
                It looks like your plant may be suffering from:{"\n"}
                <Text style={styles.yourIndex}>{diseaseResult.name}</Text>
              </Text>
              <View marginTop={"20px"}>
                <Text style={styles.diseaseInfoTitle}>
                  What is {diseaseResult.name}?
                </Text>
                <Text style={styles.normalText}>
                  {diseaseResult.description}
                </Text>
              </View>
              <View marginTop={"20px"} marginBottom={"20px"}>
                <Text style={styles.diseaseInfoTitle}>How to Treat It:</Text>
                <Text style={styles.normalText}>{diseaseResult.treatment}</Text>
              </View>
            </View>
          </View>
        )}

        {showNDVI ? (
          <View marginTop={"22px"}>
            <Text style={styles.ndviSectionTitle}>NDVI Assessment</Text>
            <Text style={styles.normalText}>
              The normalized difference vegetation index (NDVI) detects and
              quantifies the presence of live green vegetation using this
              reflected light in the visible and near-infrared bands.
            </Text>
            <Flex marginY={"15px"}>
              <Text style={styles.yourIndex}>Your Index:</Text>
              <Text style={styles.indexNum}>{NDVIReadings.index.toFixed(1)}</Text>
            </Flex>
            <Text style={[styles.normalText, styles.center]}>
              This indicates a{" "}
              {(NDVIReadings.value === "healthy") && 
                <Text style={styles.classificationColor}>a{" "}Healthy Plant. {":)"}</Text> || 
                <Text color="red.700" style={{fontFamily: "SFProDisplay-Bold"}}>an Unhealthy Plant. {":("}</Text>  
              }
              
              
            </Text>
          </View>
        ) : null}
        <Center>
          <Button
            marginTop={"30px"}
            minW="3/5"
            bg="secondary_green"
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.button}>Done</Text>
          </Button>
        </Center>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backButton: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 19,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
  plantName: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 21,
  },
  page_title: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
  resTitle: {
    color: "#597F51",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 25,
    // lineHeight: "25%",
  },
  resDesc: {
    color: "#432D1E",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Medium",
    fontSize: 16,
  },
  ndviSectionTitle: {
    color: "#432D1E",
    fontWeight: "700",
    textAlign: "left",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 18,
  },
  yourIndex: {
    color: "#432D1E",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 17,
  },
  indexNum: {
    color: "#432D1E",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 28,
    // lineHeight: "45%",
  },
  normalText: {
    color: "#432D1E",
    fontWeight: "700",
    textAlign: "left",
    fontFamily: "SFProDisplay-Medium",
    fontSize: 16,
  },
  center: {
    textAlign: "center",
  },
  classificationColor: {
    fontFamily: "SFProDisplay-Bold",
    color: "#597F51",
  },
  button: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 16,
    color: "white",
  },
  diseaseInfoTitle: {
    color: "#432D1E",
    fontWeight: "700",
    textAlign: "left",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 17,
  },
});

export { Results };
