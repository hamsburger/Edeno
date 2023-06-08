import { React } from "react";
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

const TemperatureInfo = ({ route, navigation }) => {
  const { temperatureData, plantInfo } = route.params;

  const chartWidth = 0.95 * Dimensions.get("window").width;
  const upperIdeal = temperatureData.upperIdeal;
  const lowerIdeal = temperatureData.lowerIdeal;
  const lastMeasurement =
    temperatureData.measurements[temperatureData.measurements.length - 1];
  const lastMeasurementDate =
    temperatureData.dates[temperatureData.dates.length - 1].seconds;
  const typeOfRange =
    (upperIdeal && lowerIdeal && "Ideal Range") ||
    (upperIdeal && "Upper Ideal") ||
    (lowerIdeal && "Lower Ideal");
  // returns:
  // 1 if above ideal pH
  // -1 if below ideal pH
  // 0 otherwise
  const checkPlantCondition = () => {
    if (upperIdeal && lastMeasurement > parseFloat(upperIdeal)) {
      return 1;
    } else if (lowerIdeal && lastMeasurement < parseFloat(lowerIdeal)) {
      return -1;
    }
    return 0;
  };

  const data = {
    labels: convertArrayofTimestampsToArrayOfMD(temperatureData.dates),
    datasets: buildDataset(
      temperatureData.measurements,
      lowerIdeal,
      upperIdeal
    ),
    legend: (typeOfRange && ["Your Measurements", typeOfRange]) || [
      "Your Measurements",
    ],
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
            Temperature
          </Text>
        </Box>
      </Box>
      <ScrollView paddingTop={"25px"} paddingBottom={"25px"}>
        <View paddingLeft={"30px"} paddingRight={"30px"} marginBottom={"20px"}>
          <Text style={styles.sectionTitle}>Last Measurement</Text>
          <Text
            style={styles.measurement}
            paddingTop={"7px"}
            paddingBottom={"7px"}
          >
            {lastMeasurement}°C
          </Text>
          <Text style={styles.date}>
            {convertDateToMDYHM(lastMeasurementDate)}
          </Text>
        </View>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <LineChart
            style={{
              paddingRight: 52,
              paddingLeft: 70,
            }}
            data={data}
            width={chartWidth}
            height={220}
            yAxisSuffix="°C"
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
        </Flex>

        <View paddingLeft={"30px"} paddingRight={"30px"} marginTop={"20px"}>
          {checkPlantCondition() == 0 ? (
            <Text style={[styles.alert, { color: "#1B461A" }]}>
              Your temperature is within the ideal range. Your plant thanks you
              for taking great care of it!
            </Text>
          ) : checkPlantCondition() == -1 ? (
            <View>
              <Text style={styles.alert} marginBottom={"5px"}>
                Uh-oh.. Looks like your temperature is below the recommended
                range.{" "}
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
          ) : (
            <View>
              <Text style={styles.alert} marginBottom={"5px"}>
                Uh-oh.. Looks like your temperature is above the recommended
                range.{" "}
              </Text>
              <Text style={styles.tips}>
                Dont worry! Here's what you can do to help your{" "}
                {plantInfo.plantName}:
              </Text>

              <Text
                style={styles.tips}
              >{`\u2022 Consider moving your plant to a spot that gets less light`}</Text>
              <Text
                style={styles.tips}
              >{`\u2022 Consider moving your plant to a spot that is cooler`}</Text>
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
});

export { TemperatureInfo };
