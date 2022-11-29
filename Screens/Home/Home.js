import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../../Components/Header/Header";

const Home = (props) => {
  return (
    <View>
      <Header {...props} />
      <ScrollView>
        <Text>Home</Text>
      </ScrollView>
    </View>
  );
};

export { Home };
