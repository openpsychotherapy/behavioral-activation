import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

const ValuesStack = createStackNavigator();

const ViewContent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Values</Text>
    </View>
  );
}

export const ValuesScreen = () => {
  return (
    <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <ValuesStack.Screen name="Values" component={ViewContent} />
    </ValuesStack.Navigator>
  );
}