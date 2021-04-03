import React from 'react';

import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/components/RootNavigator';
import { Provider as StorageProvider } from 'storage/context';

// Typescript custom theme declaration
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {

    }
    interface Theme {
      iconSizes: {
        small: number,
        medium: number,
        large: number
      }
    }
  }
}

// Custom theme
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
        <StorageProvider>
          <RootNavigator />
        </StorageProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
