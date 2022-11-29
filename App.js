import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Home } from "./pages/home/Home";
import { Settings } from "./pages/settings/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeSelected from "./assets/icons/my-eden-selected";
import HomeNotSelected from "./assets/icons/my-eden-not-selected";
import SettingSelected from "./assets/icons/setting-selected";
import SettingNotSelected from "./assets/icons/setting-not-selected";
import StartMeasuring from "./assets/icons/start-measuring-trigger";

import useFonts from "./hooks/useFont";

export default () => {
  const { colors } = extendTheme({});

  const theme = extendTheme({
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
      faded_green: "#ADCDB",
    },
    // Configure breakpoints if needed. I copied from
    // default breakpoints: https://docs.nativebase.io/breakpoints
    breakpoints: {
      base: 0,
      sm: 480,
      md: 768,
      lg: 992,
      xl: 1280,
    },
  });

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
  const Tab = createBottomTabNavigator();
  const getColor = ({ focused, color }) => (focused ? "#1B461A" : "white");

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
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
            name="Home"
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
            name="Measure"
            component={Home}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({}) => <StartMeasuring />,
            }}
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
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
