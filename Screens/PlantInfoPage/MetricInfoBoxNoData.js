import { React } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex, Image, Box } from "native-base";
import convertDateToMDYHM from "../../utilities/convertDateToMDYHM";

const MetricInfoBoxNoData = ({ title }) => {
  const styles = StyleSheet.create({
    sectionTitle: {
      fontWeight: 700,
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "15",
    },
    date: {
      fontWeight: 510,
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "14",
      color: "#806B6B",
    },
    measurement: {
      fontWeight: 700,
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "28",
      color: "#432D1E",
      lineHeight: "35px",
    },
    unit: {
      fontWeight: 700,
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "18",
      color: "#432D1E",
      lineHeight: "40px",
    },
    indicatorText: {
      fontWeight: 700,
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "17",
      color: "#FFFFFF",
    },
  });

  return (
    <View
      style={{
        borderColor: "#C6C7C4",
        borderWidth: "2px",
        borderRadius: "8px",
      }}
      paddingLeft="20px"
      paddingRight="20px"
      paddingBottom="10px"
      paddingTop="10px"
      marginBottom="10px"
    >
      <Flex
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        marginBottom="11px"
      >
        <Text style={styles.sectionTitle}>{title}</Text>
      </Flex>
      <View>
        <Flex flexDirection={"row"} alignItems={"center"}>
          <View flexDirection={"row"} marginRight={"7px"}>
            <Text style={styles.measurement}>No Data Available</Text>
          </View>
        </Flex>
      </View>
    </View>
  );
};

export { MetricInfoBoxNoData };
