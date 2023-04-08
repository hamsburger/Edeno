import { React, useState } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { View, Text, Box, Button, Flex } from "native-base";
import { Camera } from "expo-camera";
import { CameraPreview } from "./CameraPreview";
import Check from "../../assets/icons/check_circle.svg";
import Wrong from "../../assets/icons/wrong_circle.svg";
import FlipCamera from "../../assets/icons/flip-camera.svg";
import TakePicture from "../../assets/icons/take-picture.svg";

const TakePictureInstruction = ({ route, navigation }) => {
  const { type, plantName } = route.params;

  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState("off");

  let camera: Camera;

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  const __savePhoto = () => {
    // TO DO: Send to back end to fetch results
    // picture stored in capturedImage state variable

    if (type == "plant-health-scanner") {
      navigation.navigate("NDVIInstructions", {
        photo: capturedImage,
        plantName: plantName,
      });
    } else {
      null;
    }
  };

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

  return startCamera ? (
    previewVisible && capturedImage ? (
      <CameraPreview
        photo={capturedImage}
        retakePicture={__retakePicture}
        savePhoto={__savePhoto}
      />
    ) : (
      <Camera
        type={cameraType}
        style={{ flex: 1, width: "100%" }}
        ref={(r) => {
          camera = r;
        }}
      >
        <Box position="absolute" left={2} top={50}>
          <Button
            bg="transparent"
            _text={{
              fontSize: "19px",
              color: "#B9422C",
            }}
            onPress={() => {
              setStartCamera(false);
            }}
          >
            Back
          </Button>
        </Box>
        <TouchableOpacity
          onPress={__switchCamera}
          style={{
            position: "absolute",
            right: "4%",
            top: "7%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            <FlipCamera />
          </Text>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            flex: 1,
            width: "100%",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              alignItems: "center",
            }}
            marginBottom={"30px"}
          >
            <TouchableOpacity onPress={__takePicture}>
              <TakePicture />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    )
  ) : (
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
            onPress={__startCamera}
          >
            <Text style={styles.button}>Got it!</Text>
          </Button>
        </Flex>
      </View>
    </View>
  );
};

export { TakePictureInstruction };
