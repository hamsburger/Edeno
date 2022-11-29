import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../../Components/Header/Header";

const Settings = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <Text>Settings</Text>
      </ScrollView>
    </View>
  );
};

export { Settings };
