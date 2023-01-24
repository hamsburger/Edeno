import React from "react";
import { View, ScrollView, Flex } from "react-native";
import { Header } from "../../Components/Header/Header";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { PlantCard } from "../../Components/PlantCard";

const Home = (props) => {
  const [Plants, dispatch] = usePlants();

  return (
    <View>
      <Header {...props} />
      <ScrollView>
        <View
          w="100%"
          justifyContent="flex-start"
          flexDirection="row"
          flexWrap="wrap"
          padding={15}
          paddingBottom={140}
          bg="#FBFBFB"
        >
          {Plants.map((elem) => (
            <PlantCard plantInfo={elem} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export { Home };
