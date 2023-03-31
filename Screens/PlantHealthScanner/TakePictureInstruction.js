import { React } from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text, Box, Button, Flex } from "native-base";
import Check from "../../assets/icons/check_circle.svg";
import Wrong from "../../assets/icons/wrong_circle.svg";

const TakePictureInstruction = ({ route, navigation }) => {
  const { type } = route.params;

  const styles = StyleSheet.create({
    sectionTitle: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "17",
      textAlign: "center",
    },
    sectionDesc: {
      fontWeight: "400",
      fontFamily: "SFProDisplay-Regular",
      fontStyle: "normal",
      fontSize: "14px",
    },
    tips: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "14",
      color: "#432D1E",
      lineHeight: "25%",
    },
    button: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "16",
      color: "white",
    },
  });

  return (
    <View>
      <View>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          paddingRight="7"
          paddingLeft="7"
        >
          <Box position="absolute" left={2} top={43}>
            <Button
              bg="transparent"
              _text={{
                fontSize: "19px",
                color: "#B9422C",
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              Cancel
            </Button>
          </Box>
          {type == "plant-health-scanner" ? (
            <View>
              <Text style={styles.sectionTitle}>Plant Health Scanner</Text>
              <View marginTop={"24px"} marginBottom="15px">
                <Text style={styles.sectionDesc}>
                  Use the Plant Health Scanner, to help you diagnose any
                  potential diseases that your plant might have. {"\n"} {"\n"}
                  We suggest you perform the scan twice, once to capture the
                  front and then again to capture the back.
                </Text>
              </View>
            </View>
          ) : (
            <View marginBottom={"20px"}>
              <Text style={styles.sectionTitle}>When taking your picture:</Text>
            </View>
          )}

          <View width={"100%"} marginBottom={"20px"}>
            {type == "plant-health-scanner" ? (
              <View>
                <Text
                  style={[
                    styles.sectionTitle,
                    { textAlign: "left", fontSize: "14.3px" },
                  ]}
                >
                  When taking your picture:
                </Text>
                <Text style={[styles.tips]}>
                  {`\u2022 Make sure the picture is focused and clear`}
                </Text>
              </View>
            ) : null}
            <Text
              style={styles.tips}
            >{`\u2022 Capture the entire plant in the camera frame`}</Text>
            <Text style={[styles.tips]}>
              {`\u2022 Capture as much of the foliage as possible`}
            </Text>

            <Text style={[styles.tips]}>
              {`\u2022 Ensure there is good lighting`}
            </Text>
          </View>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            width={"100%"}
            marginBottom="15px"
          >
            <View>
              <Image
                source={require("../../assets/plant-pictures/plant-pic-1.png")}
              />
              <Check style={{ position: "absolute", top: 75, left: 75 }} />
            </View>
            <View>
              <Image
                source={require("../../assets/plant-pictures/plant-pic-2.png")}
              />
              <Wrong style={{ position: "absolute", top: 75, left: 75 }} />
            </View>
            <View>
              <Image
                source={require("../../assets/plant-pictures/plant-pic-3.png")}
              />
              <Wrong style={{ position: "absolute", top: 75, left: 75 }} />
            </View>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            width={"100%"}
          >
            <View>
              <Image
                source={require("../../assets/plant-pictures/plant-pic-4.png")}
              />
              <Wrong style={{ position: "absolute", top: 75, left: 75 }} />
            </View>
            <View>
              <Image
                source={require("../../assets/plant-pictures/plant-pic-5.png")}
              />
              <Wrong style={{ position: "absolute", top: 75, left: 75 }} />
            </View>
            <View>
              <Image
                source={require("../../assets/plant-pictures/plant-pic-6.png")}
              />
              <Wrong style={{ position: "absolute", top: 75, left: 75 }} />
            </View>
          </Flex>
          <Button
            marginTop={"30px"}
            minW="3/5"
            bg="secondary_green"
            onPress={() => {
              if (type == "plant-health-scanner") {
                null;
              } else {
                null;
              }
            }}
          >
            <Text style={styles.button}>Got it!</Text>
          </Button>
        </Flex>
      </View>
    </View>
  );
};

export { TakePictureInstruction };
