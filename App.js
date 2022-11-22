import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Content } from "./Content";

export default () => {
  const { colors } = extendTheme({});

  const theme = extendTheme({
    colors: {
      edeno_green: {
        0: "#597F51",
      },
      vermillion_red: {
        0: "#B9422C",
      },
      light_goldenrod_yellow: {
        0: "#EFF7D5",
      },
      pale_spring_bud: {
        0: "#EFF7BC",
      },
      russet_brown: {
        0: "#754824",
      },
      bistro_brown: {
        0: "#432D1E",
      },
      cultured_grey: {
        0: "#EEF0F2",
      },
      silver: {
        0: "#C6C7C4",
      },
      spanish_grey: {
        0: "#A0999E",
      },
      deep_tuape: {
        0: "#806B6B",
      },
      app_bg: {
        0: "#FBFBFB",
      },
      secondary_green: {
        0: "#72A077",
      },
      attention_yellow: {
        0: "#C9B500",
      },
      menu_selected_dark_green: {
        0: "#1B461A",
      },
      light_vermillion_red: {
        0: "#F5CFC7",
      },
      faded_green: {
        0: "#ADCDB",
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
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Content />
    </NativeBaseProvider>
  );
};
