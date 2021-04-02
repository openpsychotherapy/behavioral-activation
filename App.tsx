import React from 'react';

import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/components/RootNavigator';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

  },
  iconSizes: {
    small: 30,
    medium: 40,
    large: 60
  }
};

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
