import React from 'react';

import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/components/RootNavigator';
import { Provider as StorageProvider } from 'storage/context';

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <StorageProvider>
          <RootNavigator />
        </StorageProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
