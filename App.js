
import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Content } from './Content';

export default () => {
  const { colors } = extendTheme({});

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: colors.gray,
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
      // Configure breakpoints if needed. I copied from
      // default breakpoints: https://docs.nativebase.io/breakpoints
      breakpoints: {
        base: 0,
        sm: 480,
        md: 768,
        lg: 992,
        xl: 1280,
      }
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Content />
    </NativeBaseProvider>
  );
}