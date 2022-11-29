import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../../components/Header/Header";

const Home = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <Text>Home</Text>
      </ScrollView>
    </View>
  );
};

export { Home };
