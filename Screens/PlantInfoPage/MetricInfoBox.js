import { React } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex, Image, Box } from "native-base";
import convertDateToMDYHM from "../../utilities/convertDateToMDYHM";

const MetricInfoBox = ({ title, date, measurement, unit, highOrLow }) => {
  const styles = StyleSheet.create({
    sectionTitle: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: 15,
    },
    date: {
      fontWeight: "510",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: 14,
      color: "#806B6B",
    },
    measurement: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: 28,
      color: "#432D1E",
      lineHeight: 35,
    },
    unit: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: 18,
      color: "#432D1E",
      lineHeight: 40,
    },
    indicatorText: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: 17,
      color: "#FFFFFF",
    },
  });

  return (
    <View
      style={{
        borderColor: "#C6C7C4",
        borderWidth: 2,
        borderRadius: 8,
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
        <View flexDirection={"row"} alignItems={"center"}>
          <Text style={styles.date}>
            {convertDateToMDYHM(date)} {"   "}
          </Text>
          <Image
            style={styles.plantImage}
            source={require("../../assets/icons/right-triangle.png")}
          ></Image>
        </View>
      </Flex>
      <View>
        <Flex flexDirection={"row"} alignItems={"center"}>
          <View flexDirection={"row"} marginRight={"7px"}>
            <Text style={styles.measurement}>{measurement} </Text>
            <Text style={styles.unit}>{unit}</Text>
          </View>
          {highOrLow == 1 ? (
            <Box
              bgColor="#B9422C"
              paddingX={"3px"}
              paddingY="3px"
              borderRadius={4}
            >
              <Text style={styles.indicatorText}>HIGH</Text>
            </Box>
          ) : highOrLow == -1 ? (
            <Box
              bgColor="#C9B500"
              paddingX={"3px"}
              paddingY="3px"
              borderRadius={4}
            >
              <Text style={styles.indicatorText}>LOW</Text>
            </Box>
          ) : null}
        </Flex>
      </View>
    </View>
  );
};

export { MetricInfoBox };
