import { React } from "react";
import { View, Text, Flex, ScrollView, Box, Center, Button } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";

const Results = ({ route, navigation }) => {
  const { showNDVI, photo, plantName } = route.params;
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
        <Text style={styles.healthy}>Your plant looks healthy!</Text>
        <View marginTop={"10px"}>
          <Text style={styles.healthyDesc}>
            No diseases were detected for your plant. {"\n"} Great job!
          </Text>
        </View>
        {showNDVI ? (
          <View marginTop={"22px"}>
            <Text style={styles.sectionTitle}>NDVI Assessment</Text>
            <Text style={styles.normalText}>
              The normalized difference vegetation index (NDVI) detects and
              quantifies the presence of live green vegetation using this
              reflected light in the visible and near-infrared bands.
            </Text>
            <Flex marginY={"15px"}>
              <Text style={styles.yourIndex}>Your Index:</Text>
              <Text style={styles.indexNum}>0.70</Text>
            </Flex>
            <Text style={[styles.normalText, styles.center]}>
              This indicates a{" "}
              <Text style={styles.classificationColor}>Healthy Plant</Text>.
              Yay!
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
            <Text style={styles.button}>Return to My Eden</Text>
          </Button>
        </Center>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backButton: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontSize: "19px",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
  plantName: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "21px",
  },
  page_title: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
  healthy: {
    color: "#597F51",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontSize: "25px",
    lineHeight: "25%",
  },
  healthyDesc: {
    color: "#432D1E",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Medium",
    fontSize: "16px",
  },
  sectionTitle: {
    color: "#432D1E",
    fontWeight: 700,
    textAlign: "left",
    fontFamily: "SFProDisplay-Heavy",
    fontSize: "16px",
  },
  yourIndex: {
    color: "#432D1E",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontSize: "17px",
  },
  indexNum: {
    color: "#432D1E",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontSize: "28px",
    lineHeight: "45%",
  },
  normalText: {
    color: "#432D1E",
    fontWeight: 700,
    textAlign: "left",
    fontFamily: "SFProDisplay-Medium",
    fontSize: "16px",
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
    fontSize: "16",
    color: "white",
  },
});

export { Results };
