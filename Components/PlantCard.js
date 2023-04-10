import { React } from "react";
import { Flex, Box, Text, Button } from "native-base";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { plant_icons } from "../Constants/StaticPlantIconImages";
import calculateTimePast from "../utilities/calculateTimePast";
import Attention from "../assets/icons/attention-circle.svg";

export function PlantCard({ plantInfo, navigation }) {
  const { iconId, commonName, nickName, lastMeasured, requiresAttention } = plantInfo;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PlantInfoPage", {
          plantInfo
        });
      }}
    >
      <Flex
        w="89%"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"
        bg="#E4E4E4"
        marginBottom={15}
        padding={4}
        borderRadius={7}
      >
        <Image
          source={plant_icons[iconId]}
          style={{ height: 75, width: 75, marginRight: 16 }}
        />  
        <View style={styles.wrap}>
          <Text style={[styles.plant_name, styles.no_overflow]}>{nickName} ({commonName}) </Text>
          <Text style={[styles.last_measured, styles.no_overflow]}>
            Last Measured: {lastMeasured}
          </Text>
          <Text style={[styles.rem_and_rec, styles.no_overflow]}>No Reminders</Text>
          <Text style={{...styles.rem_and_rec, ...styles.no_overflow, color: "red"}}>{(requiresAttention) && "Requires Attention"}</Text>
        </View>
      </Flex>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plant_name: {
    fontSize: 17,
    fontFamily: "SFProDisplay-Bold",
  },
  no_overflow: {
    width: "80%"
  },
  last_measured: {
    color: "#806B6B",
    marginTop: 2,
  },
  rem_and_rec: {
    color: "#000000",
  },
  needs_attention: {
    color: "#B9422C",
    fontWeight: "700",
    fontFamily: "SFProDisplay-Bold",
  },

  wrap : {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  }
});
