import { React } from "react";
import { View, Text, Box, Flex, ScrollView } from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const PHInfo = ({ route, navigation }) => {
  const { plantInfo } = route.params;

  const chartWidth = 0.95 * Dimensions.get("window").width;

  const phData = [
    { date: "Feb 15", measurement: "5.2" },
    { date: "Feb 27", measurement: "5.5" },
    { date: "Mar 7", measurement: "6.5" },
    { date: "Mar 14", measurement: "5.9" },
    { date: "Mar 24", measurement: "7.1" },
  ];

  const idealUpper = "7";
  const idealLower = "6";

  // returns:
  // 1 if above ideal pH
  // -1 if below ideal pH
  // 0 otherwise
  const checkPH = () => {
    let lastMeasurement = parseFloat(phData[phData.length - 1].measurement);

    if (lastMeasurement > parseFloat(idealUpper)) {
      return 1;
    } else if (lastMeasurement < parseFloat(idealLower)) {
      return -1;
    }

    return 0;
  };

  const data = {
    labels: ["Feb 15", "Feb 27", "Mar 7", "Mar 14", "Mar 24"],
    datasets: [
      {
        data: [5.2, 5.5, 6.5, 5.9, 7.1],
        color: (opacity = 1) => `rgba(89, 127, 81, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [6, 6, 6, 6, 6],
        color: (opacity = 1) => `rgba(173, 205, 176, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [7, 7, 7, 7, 7],
        color: (opacity = 1) => `rgba(173, 205, 176, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Your Measurements", "Ideal Range"],
  };

  return (
    <View>
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
      <ScrollView paddingTop={"25px"} paddingBottom={"25px"}>
        <View paddingLeft={"30px"} paddingRight={"30px"} marginBottom={"20px"}>
          <Text style={styles.sectionTitle}>Last Measurement</Text>
          <Text
            style={styles.measurement}
            paddingTop={"7px"}
            paddingBottom={"7px"}
          >
            {parseFloat(phData[phData.length - 1].measurement)}
          </Text>
          <Text style={styles.date}>03/24/2023 2:20 PM</Text>
        </View>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <LineChart
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
    </View>
  );
};

const styles = StyleSheet.create({
  nav_button: {
    backgroundColor: "transparent",
  },
  page_title: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
  },
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
  sectionTitle: {
    fontWeight: 700,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "15px",
  },
  measurement: {
    fontWeight: 700,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "34px",
    lineHeight: "36px",
  },
  date: {
    fontWeight: 510,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "14",
    color: "#806B6B",
  },
  alert: {
    fontWeight: 590,
    fontFamily: "SFProDisplay-Bold",
    fontStyle: "normal",
    fontSize: "15",
    color: "#B9422C",
  },
  tips: {
    fontWeight: 500,
    fontFamily: "SFProDisplay-Regular",
    fontStyle: "normal",
    fontSize: "15",
    color: "#432D1E",
  },
});

export { PHInfo };
