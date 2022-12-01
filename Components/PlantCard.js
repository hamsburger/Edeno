import { React } from "react";
import { Flex, Box, Text } from "native-base";
import { Image, StyleSheet } from "react-native";
import { plant_icons } from "../Constants/StaticPlantIconImages";

export function PlantCard({ plantInfo }) {
  const { iconId, plantName } = plantInfo;
  return (
    <Flex
      w="100%"
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
        <Text style={styles.plant_name}>{plantName}</Text>
        <Text style={styles.last_measured}>
          Last Measured: Data Not Available
        </Text>
        <Text style={styles.rem_and_rec}>No Reminders</Text>
        <Text style={styles.rem_and_rec}>No Recommendations</Text>
      </Box>
    </Flex>
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
});
