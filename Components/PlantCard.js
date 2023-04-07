import { React } from "react";
import { Flex, Box, Text, Button, View } from "native-base";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { plant_icons } from "../Constants/StaticPlantIconImages";
import calculateTimePast from "../utilities/calculateTimePast";
import Attention from "../assets/icons/attention-circle.svg";

export function PlantCard({ plantInfo, navigation }) {
  const { id, commonName, iconId, lastMeasuredDate, requiresAttention } =
    plantInfo;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PlantInfoPage", {
          plantId: id,
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
        <Box w="100%">
          <View>
            <Text style={styles.plant_name}>{commonName}</Text>
          </View>

          {lastMeasuredDate == -1 ? (
            <Text style={styles.last_measured}>
              No Measurement Data Available
            </Text>
          ) : (
            <Text style={styles.last_measured}>
              Last Measured: {calculateTimePast(lastMeasuredDate)}
            </Text>
          )}

          {requiresAttention ? (
            <Flex flexDirection={"row"} alignItems={"center"}>
              <Attention />{" "}
              <Text style={styles.needs_attention}>Requires Attention</Text>
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plant_name: {
    fontSize: 17,
    fontFamily: "SFProDisplay-Bold",
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
    fontWeight: 700,
    fontFamily: "SFProDisplay-Bold",
  },
});
