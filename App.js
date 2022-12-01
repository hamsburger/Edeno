import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  Text,
  Center,
} from "native-base";
import { Home } from "./Screens/Home/Home";
import { Settings } from "./Screens/Settings/Settings";
import { Measure } from "./Screens/Measure/Measure";
import { MeasureModal } from "./Screens/Measure/MeasureModal";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeSelected from "./assets/icons/my-eden-selected";
import HomeNotSelected from "./assets/icons/my-eden-not-selected";
import SettingSelected from "./assets/icons/setting-selected";
import SettingNotSelected from "./assets/icons/setting-not-selected";
import StartMeasuring from "./assets/icons/start-measuring-trigger";
import { AddPlantLandingPage } from "./Screens/Add_Plant_Screens/AddPlantLandingPage";
import { Content } from "./Content";
import { initializeApp } from "firebase/app";
import useFonts from "./Hooks/Use_Fonts";
import { AddPlantProvider } from "./Hooks/Contexts/AddPlant_Context";
import { PlantProvider } from "./Hooks/Contexts/Plant_Context";
import { LiveMeasure } from "./Screens/Measure/LiveMeasure";
import { LogBox } from 'react-native';
import { FirebaseProvider } from "./Hooks/Contexts/Firebase_Context";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const DEBUG = 0;
const IGNORE_WARNINGS = 1;

if (IGNORE_WARNINGS) LogBox.ignoreLogs(['Warning: ...']);

const themeObject = {
  ...{
    components: {
      Text: {
        baseStyle: {
          color: "dark.50",
        },
      },
      ...(DEBUG && {
        Box: {
          baseStyle: {
            borderColor: "cyan.500",
            borderWidth: "1",
          },
        },
        View: {
          baseStyle: {
            borderColor: "cyan.500",
            borderWidth: "1",
          },
        },
      }),
    },

    colors: {
      edeno_green: "#597F51",
      vermillion_red: "#B9422C",
      light_goldenrod_yellow: "#EFF7D5",
      pale_spring_bud: "#EFF7BC",
      russet_brown: "#754824",
      bistro_brown: "#432D1E",
      cultured_grey: "#EEF0F2",
      silver: "#C6C7C4",
      spanish_grey: "#A0999E",
      deep_tuape: "#806B6B",
      app_bg: "#FBFBFB",
      secondary_green: "#72A077",
      attention_yellow: "#C9B500",
      menu_selected_dark_green: "#1B461A",
      light_vermillion_red: "#F5CFC7",
      faded_green: "#ADCDB0",
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  },
};

export default () => {
  const [showModal, setShowModal] = useState(false);

  const theme = extendTheme(themeObject);

  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#72A077",
            height: 100,
          },
          tabBarItemStyle: {
            backgroundColor: "#72A077",
            fontSize: "12",
          },
          tabBarOptions: {
            labelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "SFProDisplay-Bold",
            },
          },
          tabBarActiveTintColor: "#1B461A",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen
          name="My Eden"
          component={Home}
          options={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "SFProDisplay-Bold",
            },
            tabBarIcon: ({ focused }) =>
              focused ? <HomeSelected /> : <HomeNotSelected />,
          }}
        />
        <Tab.Screen
          name="MeasureTrigger"
          component={Measure}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({}) => <StartMeasuring />,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Measure");
            },
          })}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "SFProDisplay-Bold",
            },
            tabBarIcon: ({ focused }) =>
              focused ? <SettingSelected /> : <SettingNotSelected />,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
      <FirebaseProvider>
      <PlantProvider>
        <AddPlantProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Home"
            >
              <Stack.Screen name="Home" component={HomeTabs} />

              <Stack.Group
                screenOptions={({ navigation }) => ({
                  presentation: "modal",
                })}
              >
                <Stack.Screen name="Measure" component={MeasureModal} />
              </Stack.Group>
              <Stack.Screen
                name="AddPlantLandingPage"
                component={AddPlantLandingPage}
                getId={({ params }) => params.progress}
              />
              <Stack.Screen name="LiveMeasure" component={LiveMeasure} />
            </Stack.Navigator>
          </NavigationContainer>
        </AddPlantProvider>
      </PlantProvider>
      </FirebaseProvider>
    </NativeBaseProvider>
  );
};
