import { React, useState } from "react";
import { View, Text, Box, Flex, ScrollView } from "native-base";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import convertDateToMDYHM from "../../../utilities/convertDateToMDYHM";
import convertDateToFullMDYHM from "../../../utilities/convertDateToFullMDYHM";
import calculateTimePast from "../../../utilities/calculateTimePast";
import Note from "../../../assets/icons/note.svg";

const LastWatered = ({ route, navigation }) => {
  const { plantInfo, lastWateredData } = route.params;

  const lastMeasurementDate =
    lastWateredData.dates[lastWateredData.dates.length - 1].seconds;

  const [days, unit] = calculateTimePast(lastMeasurementDate);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteNum, setCurrenNoteNum] = useState(0);

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
            Last Watered
          </Text>
        </Box>
      </Box>
      <ScrollView
        paddingTop={"25px"}
        paddingBottom={"25px"}
        paddingLeft={"30px"}
        paddingRight={"30px"}
      >
        <View marginBottom={"20px"}>
          <Text style={styles.sectionTitle}>Last Measurement</Text>
          <Text
            style={styles.measurement}
            paddingTop={"7px"}
            paddingBottom={"7px"}
          >
            {days} {unit}
          </Text>
          <Text style={styles.date}>
            {convertDateToMDYHM(lastMeasurementDate)}
          </Text>
        </View>
        <View>
          <Box
            bgColor="#C6C7C4"
            borderColor="#432D1E"
            borderWidth="2px"
            paddingY="10px"
            borderTopRadius="8px"
          >
            <Text style={styles.sectionTitle} textAlign="center">
              Watering History
            </Text>
          </Box>
          <ScrollView>
            {lastWateredData.dates.map((date, i) => {
              return (
                <Box
                  bgColor="#EEF0F2"
                  borderColor="#432D1E"
                  borderBottomWidth="2px"
                  borderLeftWidth="2px"
                  borderRightWidth="2px"
                  paddingY="10px"
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      minHeight: 25,
                    }}
                  >
                    <Text style={styles.sectionTitle}>
                      {convertDateToFullMDYHM(date.seconds)}
                    </Text>
                    {lastWateredData.notes[i] != "" ? (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrenNoteNum(i);
                          setModalVisible(true);
                        }}
                        style={{ textAlign: "right" }}
                        minHeight="40px"
                      >
                        <Note />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </Box>
              );
            })}
          </ScrollView>
          <TouchableOpacity onPress={null}>
            <Box
              bgColor="#ADCDB0"
              borderColor="#432D1E"
              borderBottomWidth="2px"
              borderLeftWidth="2px"
              borderRightWidth="2px"
              paddingY="10px"
              borderBottomRadius="8px"
            >
              <Text style={styles.sectionTitle} textAlign="center">
                + Add New Record
              </Text>
            </Box>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
            <ScrollView marginBottom="20px" width="100%">
              <Text textAlign="left" style={styles.notesTitle}>
                Your Notes:
              </Text>
              <Text textAlign="left">
                {lastWateredData.notes[currentNoteNum]}
              </Text>
            </ScrollView>
            <Flex flexDirection="row" justifyContent="flex-end" width="100%">
              <TouchableOpacity
                style={[styles.button, styles.close]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyleClose}>Close</Text>
              </TouchableOpacity>
            </Flex>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 230,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  textStyleClose: {
    color: "#72A077",
    fontWeight: "bold",
    textAlign: "center",
  },
  notesTitle: {
    fontFamily: "SFProDisplay-Bold",
  },
});

export { LastWatered };
