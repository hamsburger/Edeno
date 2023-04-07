import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../../Components/Header/Header";
import { PlantCard } from "../../Components/PlantCard";
import myEdenPlants from "../../MockPlantData/myEdenData";

const Home = ({ navigation }) => {
  const [myPlants, setMyPlants] = useState(myEdenPlants);

  const styles = StyleSheet.create({
    noPlants: {
      fontSize: "26px",
      textAlign: "center",
      color: "#806B6B",
      textAlign: "center",
      fontWeight: "400",
      fontFamily: "SFProDisplay-Medium",
      fontStyle: "normal",
    },
    noPlantsContainer: {
      padding: 10,
      paddingTop: "60%",
    },
  });

  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView>
        {myPlants.length == 0 ? (
          <View style={styles.noPlantsContainer}>
            <Text style={styles.noPlants}>
              Click "+" to add a plant and get started
            </Text>
          </View>
        ) : (
          <View
            justifyContent="flex-start"
            flexDirection="row"
            flexWrap="wrap"
            paddingTop={15}
            paddingBottom={15}
            paddingLeft={15}
            paddingRight={22}
            bg="#FBFBFB"
          >
            {myPlants.map((elem) => (
              <PlantCard plantInfo={elem} navigation={navigation} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export { Home };
