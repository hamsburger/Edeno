import { React } from "react";
import { View, Text } from "native-base";

const PlantInfoPage = ({ route, navigation }) => {
  const { plantInfo } = route.params;
  return (
    <View marginTop={100}>
      <Text>{plantInfo.plantName}</Text>
    </View>
  );
};

export { PlantInfoPage };
