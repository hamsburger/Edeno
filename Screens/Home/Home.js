import { React, useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../../Components/Header/Header";
import { usePlants } from "../../hooks/Contexts/Plant_Context";
import { PlantCard } from "../../Components/PlantCard";
import { useFirebaseDatabase } from "../../hooks/Contexts/Firebase_Context";
import { getAuth } from 'firebase/auth';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [Plants, setPlants] = usePlants();
  const styles = StyleSheet.create({
    noPlants: {
      fontSize: 26,
      textAlign: "center",
      color: "#806B6B",
      textAlign: "center",
      fontWeight: "400",
      fontFamily: "SFProDisplay-Medium",
      fontStyle: "normal",
    },
    noPlantsContainer: {
      padding: 10,
      paddingTop: "60%"
    },
  });
  const auth = getAuth();

  /* Need useCallback to avoid repeated calls */
  useFocusEffect(
      useCallback(() => {
        auth.currentUser.getIdToken()
        .then((idToken) => {
            fetch(`http://100.67.1.246:8080/get-plants-from-user-id?token=${idToken}`, {
              method: "get"
            })
            .then(response => response.json())
            .then(data => {
              let plantDict = Object.values(data)
              setPlants(plantDict)
            }).catch((error) => console.log(error))
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  );


  return (
      <ScrollView stickyHeaderIndices={[0]}>
      <Header navigation={navigation} />
        {Plants.length == 0 ? (
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
  );
};

export { Home };
