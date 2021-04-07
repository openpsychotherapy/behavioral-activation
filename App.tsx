import React from 'react';

import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/components/RootNavigator';
import { LanguageProvider } from './src/components/LanguageProvider';

export default function App() {
  return (
    <LanguageProvider>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </LanguageProvider>
  );
}
