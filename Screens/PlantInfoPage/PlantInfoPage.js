import { React, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import { AccordionComponent } from "./AccordionComponent";
import {
  View,
  Flex,
  Text,
  ScrollView,
  Menu,
  Box,
  ArrowBackIcon,
  Center,
} from "native-base";
import Kabob from "../../assets/icons/kabob.svg";
import Warning from "../../assets/icons/plant-info-page-icons/warning.svg";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { MetricInfoBox } from "./MetricInfoBox";

const PlantInfoPage = ({ route, navigation }) => {
  const { plantInfo } = route.params;
  const [Plants, dispatch] = usePlants();

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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 8,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      height: 300,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      marginBottom: 10,
      textAlign: "center",
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "20",
      color: "black",
    },
    modalSub: {
      textAlign: "center",
    },
    modalWarning: {
      marginTop: 5,
      marginBottom: 15,
      backgroundColor: "#F5CFC7",
      width: "100%",
      borderRadius: 4,
      borderWidth: 4,
      borderLeftColor: "#B9422C",
      borderRightColor: "#F5CFC7",
      borderTopColor: "#F5CFC7",
      borderBottomColor: "#F5CFC7",
    },
    warningTitle: {
      fontWeight: "600",
      fontFamily: "SFProDisplay-Semibold",
      fontStyle: "normal",
      fontSize: "16",
      color: "black",
      paddingTop: 8,
    },
    warningDesc: {
      fontWeight: "600",
      fontFamily: "SFProDisplay-Regular",
      fontStyle: "normal",
      fontSize: "14",
      color: "black",
      lineHeight: "20",
      paddingRight: 8,
      paddingBottom: 8,
    },
    button: {
      borderRadius: 4,
      padding: 12,
      elevation: 2,
      marginLeft: 15,
      backgroundColor: "white",
      borderColor: "#72A077",
      borderWidth: 1,
    },
    close: {
      color: "#72A077",
    },
    confirm: {
      backgroundColor: "#72A077",
    },
    textStyleClose: {
      color: "#72A077",
      fontWeight: "bold",
      textAlign: "center",
    },
    textStyleConfirm: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    textStyleCloseMeasurements: {
      color: "#B9422C",
      fontWeight: "bold",
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
  const [modalVisible, setModalVisible] = useState(false);
  const [measureModalVisible, setMeasureModalVisible] = useState(false);

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
            <Menu.Item
              onPress={() => {
                setMeasureModalVisible(true);
              }}
            >
              Take Measurements
            </Menu.Item>
            <Menu.Item onPress={() => setModalVisible(true)}>Delete</Menu.Item>
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
        {/* <AccordionComponent
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
        /> */}

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
            marginBottom={"30px"}
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
        <View marginBottom={"40px"}>
          <MetricInfoBox
            title="Last Watered"
            date="03/21/2023 2:20 PM"
            measurement="3"
            unit="days ago"
          />

          <MetricInfoBox
            title="Last Fertilized"
            date="03/17/2023 2:20 PM"
            measurement="1"
            unit="week ago"
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PHInfo", {
                plantInfo: plantInfo,
              });
            }}
          >
            <MetricInfoBox
              title="pH"
              date="03/24/2023 2:20 PM"
              measurement="5.2"
              unit=""
            />
          </TouchableOpacity>
          <MetricInfoBox
            title="Soil Moisture"
            date="03/24/2023 2:20 PM"
            measurement="57"
            unit="%"
          />
          <MetricInfoBox
            title="Humidity"
            date="03/24/2023 2:20 PM"
            measurement="61"
            unit="%"
          />
          <MetricInfoBox
            title="Temperature"
            date="03/24/2023 2:20 PM"
            measurement="18"
            unit="°C"
          />
          <MetricInfoBox
            title="Light Intensity"
            date="03/24/2023 2:20 PM"
            measurement="54"
            unit="LUX"
          />
          <MetricInfoBox
            title="NDVI"
            date="03/24/2023 2:20 PM"
            measurement="Healthy"
            unit=""
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete {plantInfo.plantName}?</Text>
            <Text style={styles.modalSub}>
              Are you sure you want to delete {plantInfo.plantName} from your
              Eden? You cannot undo this action.
            </Text>
            <Box style={styles.modalWarning}>
              <Flex flexDirection="row" width="90%">
                <Warning
                  width={20}
                  height={25}
                  marginRight={8}
                  marginLeft={8}
                  marginTop={5}
                />
                <View>
                  <Text style={styles.warningTitle}>Warning</Text>
                  <Text style={styles.warningDesc}>
                    You will permenantly lose all measurements and data
                    associated with this plant.
                  </Text>
                </View>
              </Flex>
            </Box>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              width="100%"
            >
              <TouchableOpacity
                style={[styles.button, styles.close]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyleClose}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirm]}
                onPress={() => {
                  dispatch({
                    type: "deleted",
                    ...plantInfo,
                  });

                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.textStyleConfirm}>Yes, I'm sure</Text>
              </TouchableOpacity>
            </Flex>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={measureModalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { height: 150 }]}>
            <Text
              style={[
                {
                  color: "#B9422C",
                  textAlign: "start",
                  fontFamily: "SFProDisplay-Bold",
                  fontSize: "15",
                },
              ]}
            >
              Place the device in your {plantInfo.plantName} before proceeding.
            </Text>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              width="100%"
              marginTop={5}
            >
              <TouchableOpacity
                style={[styles.button, { borderColor: "#B9422C" }]}
                onPress={() => setMeasureModalVisible(!measureModalVisible)}
              >
                <Text style={styles.textStyleCloseMeasurements}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#B9422C", borderColor: "#B9422C" },
                ]}
                onPress={() => {
                  setMeasureModalVisible(!measureModalVisible);

                  const selectedIndex = Plants.findIndex(
                    (plant) => plant.id == plantInfo.id
                  );
                  // plantIndex is the index of the plant in the Plant Context
                  navigation.navigate("LiveMeasure", {
                    plantIndex: selectedIndex,
                  });
                }}
              >
                <Text style={styles.textStyleConfirm}>Proceed</Text>
              </TouchableOpacity>
            </Flex>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export { PlantInfoPage };
