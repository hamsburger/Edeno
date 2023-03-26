import { React } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex, Image } from "native-base";
import convertDateToMDYHM from "../../utilities/convertDateToMDYHM";

const MetricInfoBox = ({ title, date, measurement, unit }) => {
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
      <View flexDirection={"row"}>
        <Text style={styles.measurement}>{measurement} </Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};

export { MetricInfoBox };
