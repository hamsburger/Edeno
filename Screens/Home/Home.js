import React from "react";
import { View, ScrollView, Flex } from "react-native";
import { Header } from "../../Components/Header/Header";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { PlantCard } from "../../Components/PlantCard";

const Home = ({ navigation }) => {
  const [Plants, dispatch] = usePlants();

  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView>
        <View
          // w="90%"
          justifyContent="flex-start"
          flexDirection="row"
          flexWrap="wrap"
          paddingTop={15}
          paddingBottom={15}
          paddingLeft={15}
          paddingRight={22}
          bg="#FBFBFB"
        >
          {Plants.map((elem) => (
            <PlantCard plantInfo={elem} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export { Home };
