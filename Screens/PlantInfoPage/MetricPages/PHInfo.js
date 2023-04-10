import { React, useState } from "react";
import { View, Text, Box, Flex, ScrollView } from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import convertDateToMDYHM from "../../../utilities/convertDateToMDYHM";
import convertArrayofTimestampsToArrayOfMD from "../../../utilities/convertArrayofTimestampsToArrayOfMD";
import { buildDataset } from "../../../Functions/utilities";

const PHInfo = ({ route, navigation }) => {
  const { phDataExternal, plantInfo } = route.params;
  const [npkValue, setNPKValue] = useState(
    "Tap on a datapoint to see the N-P-K measurement"
  );
  const chartWidth = 0.95 * Dimensions.get("window").width;
  const upperIdeal = phDataExternal.upperIdeal;
  const lowerIdeal = phDataExternal.lowerIdeal;
  const lastMeasurement =
    phDataExternal.measurements[phDataExternal.measurements.length - 1];
  const lastMeasurementDate =
    phDataExternal.dates[phDataExternal.dates.length - 1].seconds;
  const typeOfRange = (upperIdeal && lowerIdeal) && "Ideal Range" ||
    (upperIdeal) && "Upper Ideal" || (lowerIdeal) && "Lower Ideal"
  // returns:
  // 1 if above ideal pH
  // -1 if below ideal pH
  // 0 otherwise
  const checkPH = () => {
    if (lastMeasurement > upperIdeal) {
      return 1;
    } else if (lastMeasurement < lowerIdeal) {
      return -1;
    }
    return 0;
  };

  const dates = convertArrayofTimestampsToArrayOfMD(phDataExternal.dates);

  const data = {
    labels: dates,
    datasets: buildDataset(phDataExternal.measurements, lowerIdeal, upperIdeal),
    legend: ["Your Measurements", typeOfRange],
  };

  const getNPKValue = ({ index }) => {
    setNPKValue(
      `N-P-K Measurement on ${dates[index]} is ${phDataExternal.npkMeasurements[index]}`
    );
  };

  return (
    <ScrollView stickyHeaderIndices={0}>
      <Box
        bgColor="secondary_green"
        paddingTop="70px"
        px="30px"
        paddingBottom="15px"
      >
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="row"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </Flex>
        <Box>
          <Text marginTop={"10px"} style={styles.plantName}>
            {plantInfo.plantName}
          </Text>
          <Text fontSize="37px" style={styles.page_title}>
            pH
          </Text>
        </Box>
      </Box>
      <ScrollView height={"100%"} paddingTop={"25px"} marginBottom={"100px"}>
        <View paddingLeft={"30px"} paddingRight={"30px"} marginBottom={"20px"}>
          <Text style={styles.sectionTitle}>Last Measurement</Text>
          <Text
            style={styles.measurement}
            paddingTop={"7px"}
            paddingBottom={"7px"}
          >
            {lastMeasurement}
          </Text>
          <Text style={styles.date}>
            {convertDateToMDYHM(lastMeasurementDate)}
          </Text>
        </View>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <LineChart
            onDataPointClick={(e) => {
              getNPKValue(e);
            }}
            style={{
              paddingRight: 50,
              paddingLeft: 70,
            }}
            data={data}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#F2F2F2",
              backgroundGradientFrom: "#F2F2F2",
              backgroundGradientTo: "#F2F2F2",
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "0",
                stroke: "#ADCDB0",
              },
            }}
          />
          <Text style={styles.npk_prompt}>{npkValue}</Text>
        </Flex>

        <View paddingLeft={"30px"} paddingRight={"30px"} marginTop={"20px"}>
          {checkPH() == 0 ? (
            <Text style={[styles.alert, { color: "#1B461A" }]}>
              Your pH level is within the ideal range. Your plant thanks you for
              taking great care of it!
            </Text>
          ) : checkPH() == -1 ? (
            <View>
              <Text style={styles.alert} marginBottom={"5px"}>
                Uh-oh.. Looks like your pH level is below the recommended range.{" "}
              </Text>
              <Text style={styles.tips}>
                Dont worry! Here's what you can do to help your{" "}
                {plantInfo.plantName}:
              </Text>

              <Text
                style={styles.tips}
              >{`\u2022 Consider using a lime-based compound such as dolomite lime and agricultural lime to help increase the pH of the soil`}</Text>

              <Text
                style={[styles.tips, { color: "#72A077" }]}
                onPress={() => Linking.openURL("http://google.com")}
              >
                {`\u2022 Click here for more information`}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.alert} marginBottom={"5px"}>
                Uh-oh.. Looks like your pH level is above the recommended range.{" "}
              </Text>
              <Text style={styles.tips}>
                Dont worry! Here's what you can do to help your{" "}
                {plantInfo.plantName}:
              </Text>

              <Text
                style={styles.tips}
              >{`\u2022 Consider using a lime-based compound`}</Text>
              <Text
                style={[styles.tips, { color: "#72A077" }]}
                onPress={() => Linking.openURL("http://google.com")}
              >
                {`\u2022 Click here for more information`}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page_title: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
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
  sectionTitle: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 15,
  },
  measurement: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 34,
    lineHeight: 36,
  },
  date: {
    fontWeight: "510",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 14,
    color: "#806B6B",
  },
  alert: {
    fontWeight: "590",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: 15,
    color: "#B9422C",
  },
  tips: {
    fontWeight: "500",
    fontFamily: "SFProDisplay-Regular",
    fontStyle: "normal",
    fontSize: 15,
    color: "#432D1E",
  },
  npk_prompt: {
    fontFamily: "SFProDisplay-RegularItalic",
    fontSize: 15,
    fontWeight: "700",
    color: "#597F51",
  },
});

export { PHInfo };
