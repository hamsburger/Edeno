
import React from 'react';
// import { View, Text } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Content } from './Content';
import { AddPlantLandingPage } from './Screens/Add_Plant_Screens/AddPlantLandingPage';
import { initializeApp } from 'firebase/app';
import { Box, Text, Center } from 'native-base';

const Stack = createNativeStackNavigator();

// function DetailsScreen({ navigation }) {
//   return <Box h="100%" w="100%" bg="white"> 
//         <Box h="100%" w="100%" bg="transparent">
//           <Text position="absolute" p={4} size="md" color="green">Cancel</Text>
//         </Box>
//     </Box>;
// }

export default () => {
  // const { colors } = extendTheme({});

  const theme = extendTheme({
    components: {
      Text : {
        baseStyle : {
          color: "dark.50"
        }
      }
    },

    colors: {
      // Add new color
      primary: {
        fernGreen : "#4e804c",
        lightGoldenrodYellow : "#edf7d2",
        paleSpringRod : "#edf7b5",
        russet : "#7d451b", 
        bistro : "#472c1b"
      },

      secondary: {
        green : "#72a077",
        fadedGreen: "#adcdb0",
        fernGreen : "#4e804c",
        cultured : "#eef0f2",
        silver : "#c6c7c4",
        spanishGrey : "#a2999e",
        deepTaupe : "#846a6a"
      },
      
      // Configure breakpoints if needed. I copied from
      // default breakpoints: https://docs.nativebase.io/breakpoints
      // breakpoints: {
      //   base: 0,
      //   sm: 480,
      //   md: 768,
      //   lg: 992,
      //   xl: 1280,
      // }
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Content}/>
          <Stack.Screen name="AddPlantLandingPage" component={AddPlantLandingPage} getId={({params}) => params.progress}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}