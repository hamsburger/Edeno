import { React, useState, useRef, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { AccordionComponent } from "./AccordionComponent";
import {
  View,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Menu,
  Box,
  ArrowBackIcon,
  Center,
} from "native-base";
import Kabob from "../../assets/icons/kabob.svg";

const PlantInfoPage = ({ route, navigation }) => {
  const { plantInfo } = route.params;

  const styles = StyleSheet.create({
    plantImage: { height: 170, opacity: 0.7 },
    plantName: {
      color: "white",
      fontWeight: "700",
      textAlign: "center",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
    },
    plantDates: {
      color: "white",
      textAlign: "center",
      fontWeight: "800",
      fontFamily: "SFProDisplay-Medium",
      fontStyle: "normal",
    },
    sectionTitle: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "17",
    },
    sectionDesc: {
      fontWeight: "400",
      fontFamily: "SFProDisplay-Regular",
      fontStyle: "normal",
      fontSize: "14",
    },
    diseaseScanner: {
      justifyContent: "center",
    },
    startScan: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "20",
      color: "#597F51",
      textAlign: "center",
    },
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // This is mock data for now. Will fix when i know format of what actual data looks like.
  const mockPlantData = {
    dateLastMeasured: "1 week ago",
    dateAdded: "May 2022",
  };

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <Image
        style={styles.plantImage}
        source={require("../../assets/plantImage.png")}
      ></Image>
      <Box
        bgColor="secondary_green"
        paddingTop="70px"
        px="20px"
        marginTop={-7}
        paddingBottom="15px"
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
      >
        <Box>
          <TouchableOpacity
            onPress={() => {
              // plantIndex is the index of the plant in the Plant Context
              navigation.navigate("Home", {
                plantInfo: plantInfo,
              });
            }}
          >
            <ArrowBackIcon size="35" color="white" />
          </TouchableOpacity>
        </Box>
        <Flex position="absolute" width="30%" top={0} right={0}>
          <Menu
            placement="bottom left"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  w="100%"
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Flex
                    w="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                    pr={9}
                    pt={20}
                    pb={6}
                    flexDirection="row"
                  >
                    <Kabob width={7} height={29} />
                  </Flex>
                </Pressable>
              );
            }}
          >
            <Menu.Item>Take Measurements</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
          </Menu>
        </Flex>
        <Box>
          <Text fontSize="34px" style={styles.plantName}>
            {plantInfo.plantName}
          </Text>
          <Text fontSize="14px" style={styles.plantDates}>
            Last Measured: {mockPlantData.dateLastMeasured}
          </Text>
          <Text fontSize="14px" style={styles.plantDates}>
            Added: {mockPlantData.dateLastMeasured}
          </Text>
        </Box>
      </Box>
      <View paddingLeft="20px" paddingRight="20px">
        <AccordionComponent
          viewInside={
            <View>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
            </View>
          }
          iconName="info"
          sectionTitle="Information"
        />

        <AccordionComponent
          viewInside={
            <View>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
            </View>
          }
          iconName="measurements"
          sectionTitle="Recent Measurements"
        />

        <AccordionComponent
          viewInside={
            <View>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
            </View>
          }
          iconName="reccos"
          sectionTitle="Recommendations & Reminders"
        />
        <View marginTop="16px">
          <Text style={styles.sectionTitle}>Plant Health Scanner</Text>
          <View paddingTop={"5px"}>
            <Text style={styles.sectionDesc}>
              Use the Plant Health Scanner to detect diseases.
            </Text>
          </View>
          <Flex
            justifyContent="center"
            alignItems="center"
            marginTop={"10px"}
            marginBottom={"50px"}
          >
            <TouchableOpacity onPress={null}>
              <Image
                style={{ marginBottom: 13 }}
                source={require("../../assets/icons/plant-info-page-icons/disease-scanner-icon.png")}
              />
              <Animated.Text style={[styles.startScan, { opacity: fadeAnim }]}>
                Start Scan
              </Animated.Text>
            </TouchableOpacity>
          </Flex>
        </View>
      </View>
    </ScrollView>
  );
};

export { PlantInfoPage };
