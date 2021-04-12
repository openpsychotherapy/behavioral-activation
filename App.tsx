import React from 'react';

import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/components/RootNavigator';
import { Provider as StorageProvider } from 'storage/context';

import { CustomTheme } from './src/CustomTheme';

export default function App() {
  return (
    <PaperProvider theme={CustomTheme}>
      <NavigationContainer>
        <StorageProvider>
          <RootNavigator />
        </StorageProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
