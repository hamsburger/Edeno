import { React } from "react";
import { View, Text, Box, Flex, ScrollView } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";

const PHInfo = ({ route, navigation }) => {
  const { plantInfo } = route.params;
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
      <ScrollView
        paddingTop={"25px"}
        paddingBottom={"25px"}
        paddingLeft={"30px"}
        paddingRight={"30px"}
      >
        <View>
          <Text style={styles.sectionTitle}>Last Measurement</Text>
          <Text
            style={styles.measurement}
            paddingTop={"7px"}
            paddingBottom={"7px"}
          >
            5.2
          </Text>
          <Text style={styles.date}>03/24/2023 2:20 PM</Text>
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
});

export { PHInfo };
