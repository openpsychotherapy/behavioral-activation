import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { SettingsScreen } from './SettingsScreen';

const InformationStack = createStackNavigator();

const ViewContent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Information</Text>
    </View>
  );
}

export const InformationScreen = () => {
  return (
    <InformationStack.Navigator initialRouteName='Information' headerMode='float'
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <InformationStack.Screen name='Information' component={ViewContent} />
      <InformationStack.Screen name='Settings' component={SettingsScreen} />
    </InformationStack.Navigator>
  );
}
