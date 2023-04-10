import { React, useState, useRef, useEffect, useCallback } from "react";
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
import { MetricInfoBox } from "./MetricInfoBox";
import { plantData } from "../../MockPlantData/plantData";
import calculateTimePast from "../../utilities/calculateTimePast";
import { MetricInfoBoxNoData } from "./MetricInfoBoxNoData";
import convertDateToFullMDYHM from "../../utilities/convertDateToFullMDYHM";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { useFirebaseDatabase } from "../../Hooks/Contexts/Firebase_Context";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const PlantInfoPage = ({ route, navigation }) => {
  const { plantInfo } = route.params;
  const [ plantRecs, setPlantRecs ] = useState({});
  console.log(plantInfo)
  console.log(`PLANT INFO PAGE LOG: PLANT ID --> ${plantInfo.plantId}`);

  useFocusEffect(
    useCallback(() => {
      auth.currentUser.getIdToken()
        .then((idToken) => {
            fetch(
              // `http://192.168.2.11:8080/get-plant-information-by-plant-id?token=${idToken}&plantId=${plantInfo.plantId}`,
              `https://python-http-plant-recommendation-container-63od3iyczq-uk.a.run.app/get-plant-information-by-plant-id?token=${idToken}&plantId=${plantInfo.plantId}`,
              {
              method: "post"
            })
            .then(response => response.json())
            .then(data => {
              setPlantRecs(data)
            }).catch((error) => console.log(error))
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  );
  
  // Get plant information by id
  useEffect(() => {
    // Used for animating "Start Scan"
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

    // CALL BACKEND FOR PLANT INFORMATION
    // GET /get-plant-information-by-plant-id WITH id from route.params

  }, [Object.keys(plantRecs).length]);

  const [Plants, _] = usePlants();
  const db = useFirebaseDatabase();
  const auth = getAuth();

  // returns
  // 1 if HIGH
  // -1 if LOW
  // 0 otherwise
  const isHighOrLow = (upperIdeal, lowerIdeal, measurement) => {
    if (lowerIdeal !== null && measurement < lowerIdeal) {
      return -1;
    } else if (upperIdeal !== null && measurement > upperIdeal) {
      return 1;
    }

    return 0;
  };

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
      fontSize:  17,
    },
    sectionDesc: {
      fontWeight: "400",
      fontFamily: "SFProDisplay-Regular",
      fontStyle: "normal",
      fontSize:  14,
    },
    diseaseScanner: {
      justifyContent: "center",
    },
    startScan: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize:  20,
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
      fontSize:  20,
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
      fontSize:  16,
      color: "black",
      paddingTop: 8,
    },
    warningDesc: {
      fontWeight: "600",
      fontFamily: "SFProDisplay-Regular",
      fontStyle: "normal",
      fontSize:  14,
      color: "black",
      lineHeight: 20,
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
  const [expanded, setExpanded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [measureModalVisible, setMeasureModalVisible] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    (plantRecs) && <ScrollView>
      <Box
        bgColor="secondary_green"
        paddingTop="70px"
        px="20px"
        paddingBottom="15px"
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
      >
        <Box>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
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
            {plantInfo.nickName} ({plantInfo.commonName}) 
          </Text>
            <Text fontSize="14px" style={styles.plantDates}>
              Added: {(plantRecs) && convertDateToFullMDYHM(plantRecs.addedDate)}
            </Text>
            <Text fontSize="14px" style={styles.plantDates}>
              Last Measured:{" "}
              {/* {plantRecs.lastMeasuredDate} */}
              {convertDateToFullMDYHM(plantRecs.lastMeasuredDate)}
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
            <TouchableOpacity
              // No Idea what this is
              onPress={() => {
                navigation.navigate("TakePictureInstruction", {
                  type: "plant-health-scanner",
                  plantName: plantRecs.plantName,
                });
              }}
            >
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
        {Object.keys(plantRecs).length == 0 ? null : (
          <View marginBottom={"40px"}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LastWateredOrFertilized", {
                  plantInfo: plantRecs,
                  data: plantRecs.lastWatered,
                  type: "water",
                });
              }}
            >
              {plantRecs.lastWatered.dates.length > 0 ? (
                <MetricInfoBox
                  title="Last Watered"
                  date={
                    plantRecs.lastWatered.dates[
                      plantRecs.lastWatered.dates.length - 1
                    ].seconds
                  }
                  measurement={
                    calculateTimePast(
                      plantRecs.lastWatered.dates[
                        plantRecs.lastWatered.dates.length - 1
                      ].seconds
                    )[0]
                  }
                  unit={
                    calculateTimePast(
                      plantRecs.lastWatered.dates[
                        plantRecs.lastWatered.dates.length - 1
                      ].seconds
                    )[1]
                  }
                  highOrLow={0}
                />
              ) : (
                <MetricInfoBoxNoData title="Last Watered" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LastWateredOrFertilized", {
                  plantInfo: plantRecs,
                  data: plantRecs.lastFertilized,
                  type: "fertilize",
                });
              }}
            >
              {plantRecs.lastFertilized.dates.length > 0 ? (
                <MetricInfoBox
                  title="Last Fertilized"
                  date={
                    plantRecs.lastFertilized.dates[
                      plantRecs.lastFertilized.dates.length - 1
                    ].seconds
                  }
                  measurement={
                    calculateTimePast(
                      plantRecs.lastFertilized.dates[
                        plantRecs.lastFertilized.dates.length - 1
                      ].seconds
                    )[0]
                  }
                  unit={
                    calculateTimePast(
                      plantRecs.lastFertilized.dates[
                        plantRecs.lastFertilized.dates.length - 1
                      ].seconds
                    )[1]
                  }
                  highOrLow={0}
                />
              ) : (
                <MetricInfoBoxNoData title="Last Fertilized" />
              )}
            </TouchableOpacity>

            {plantRecs.phData.dates.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PHInfo", {
                    plantInfo: plantRecs,
                    phDataExternal: plantRecs.phData,
                  });
                }}
              >
                <MetricInfoBox
                  title="pH"
                  date={
                    plantRecs.phData.dates[plantRecs.phData.dates.length - 1]
                      .seconds
                  }
                  measurement={
                    plantRecs.phData.measurements[
                      plantRecs.phData.measurements.length - 1
                    ]
                  }
                  unit=""
                  highOrLow={isHighOrLow(
                    plantRecs.phData.upperIdeal,
                    plantRecs.phData.lowerIdeal,
                    plantRecs.phData.measurements[
                      plantRecs.phData.measurements.length - 1
                    ]
                  )}
                />
              </TouchableOpacity>
            ) : (
              <MetricInfoBoxNoData title="pH" />
            )}

            {plantRecs.soilMoistureData.dates.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SoilMoistureInfo", {
                    plantInfo: plantRecs,
                    soilMoistureData: plantRecs.soilMoistureData,
                  });
                }}
              >
                <MetricInfoBox
                  title="Soil Moisture"
                  date={
                    plantRecs.soilMoistureData.dates[
                      plantRecs.soilMoistureData.dates.length - 1
                    ].seconds
                  }
                  measurement={
                    plantRecs.soilMoistureData.measurements[
                      plantRecs.soilMoistureData.measurements.length - 1
                    ]
                  }
                  unit="%"
                  highOrLow={isHighOrLow(
                    plantRecs.soilMoistureData.upperIdeal,
                    plantRecs.soilMoistureData.lowerIdeal,
                    plantRecs.soilMoistureData.measurements[
                      plantRecs.soilMoistureData.measurements.length - 1
                    ]
                  )}
                />
              </TouchableOpacity>
            ) : (
              <MetricInfoBoxNoData title="Soil Moisture" />
            )}

            {plantRecs.humidityData.dates.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("HumidityInfo", {
                    plantInfo: plantRecs,
                    humidityData: plantRecs.humidityData,
                  });
                }}
              >
                <MetricInfoBox
                  title="Humidity"
                  date={
                    plantRecs.humidityData.dates[
                      plantRecs.humidityData.dates.length - 1
                    ].seconds
                  }
                  measurement={
                    plantRecs.humidityData.measurements[
                      plantRecs.humidityData.measurements.length - 1
                    ]
                  }
                  unit="%"
                  highOrLow={isHighOrLow(
                    plantRecs.humidityData.upperIdeal,
                    plantRecs.humidityData.lowerIdeal,
                    plantRecs.humidityData.measurements[
                      plantRecs.humidityData.measurements.length - 1
                    ]
                  )}
                />
              </TouchableOpacity>
            ) : (
              <MetricInfoBoxNoData title="Humidity" />
            )}

            {plantRecs.temperatureData.dates.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TemperatureInfo", {
                    plantInfo: plantRecs,
                    temperatureData: plantRecs.temperatureData,
                  });
                }}
              >
                <MetricInfoBox
                  title="Temperature"
                  date={
                    plantRecs.temperatureData.dates[
                      plantRecs.temperatureData.dates.length - 1
                    ].seconds
                  }
                  measurement={
                    plantRecs.temperatureData.measurements[
                      plantRecs.temperatureData.measurements.length - 1
                    ]
                  }
                  unit="°C"
                  highOrLow={isHighOrLow(
                    plantRecs.temperatureData.upperIdeal,
                    plantRecs.temperatureData.lowerIdeal,
                    plantRecs.temperatureData.measurements[
                      plantRecs.temperatureData.measurements.length - 1
                    ]
                  )}
                />
              </TouchableOpacity>
            ) : (
              <MetricInfoBoxNoData title="Temperature" />
            )}

            {plantRecs.lightIntensityData.dates.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LightIntensityInfo", {
                    plantInfo: plantRecs,
                    lightIntensityData: plantRecs.lightIntensityData,
                  });
                }}
              >
                <MetricInfoBox
                  title="Light Intensity"
                  date={
                    plantRecs.lightIntensityData.dates[
                      plantRecs.lightIntensityData.dates.length - 1
                    ].seconds
                  }
                  measurement={
                    plantRecs.lightIntensityData.measurements[
                      plantRecs.lightIntensityData.measurements.length - 1
                    ]
                  }
                  unit="LUX"
                  highOrLow={isHighOrLow(
                    plantRecs.lightIntensityData.upperIdeal,
                    plantRecs.lightIntensityData.lowerIdeal,
                    plantRecs.lightIntensityData.measurements[
                      plantRecs.lightIntensityData.measurements.length - 1
                    ]
                  )}
                />
              </TouchableOpacity>
            ) : (
              <MetricInfoBoxNoData title="Light Intensity" />
            )}

            <MetricInfoBox
              title="NDVI"
              date={1679678124}
              measurement="Healthy"
              unit=""
            />
          </View>
        )}
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
            <Text style={styles.modalTitle}>Delete {plantRecs.plantName}?</Text>
            <Text style={styles.modalSub}>
              Are you sure you want to delete {plantRecs.plantName} from your
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
                  console.log(plantRecs)
                  db.deletePath(`users/${auth.currentUser.uid}/plants/${plantRecs["plantId"]}`)
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
                  // textAlign: "start",
                  fontFamily: "SFProDisplay-Bold",
                  fontSize:  15,
                },
              ]}
            >
              Place the device in your {plantRecs.plantName} before proceeding.
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
                    (plant) => plant.plantId == plantRecs.plantId
                  );

                  // plantIndex is the index of the plant in the Plant Context
                  navigation.navigate("LiveMeasure", {
                    plantIndex: selectedIndex
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
