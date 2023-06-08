import { React } from "react";
import { View, Flex, Box, Button } from "native-base";
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CameraPreview = ({ photo, savePhoto, retakePicture }) => {
  const styles = StyleSheet.create({
    prompts: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Heavy",
      fontStyle: "normal",
      fontSize: 20,
    },
  });

  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <Flex
          flexDirection={"row"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          width="100%"
          height={"100%"}
          paddingBottom="80px"
          paddingX="30px"
        >
          <Text onPress={() => retakePicture()} style={styles.prompts}>
            Re-take
          </Text>
          <Text onPress={() => savePhoto()} style={styles.prompts}>
            Continue
          </Text>
        </Flex>
      </ImageBackground>
    </View>
  );
};

export { CameraPreview };
