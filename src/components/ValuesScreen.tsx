import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

const ValuesStack = createStackNavigator();

function ViewContent() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Values</Text>
      </View>
    </View>
  );
}

export function ValuesScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <ValuesStack.Screen name="Values" component={ViewContent} />
      </ValuesStack.Navigator>
    </View>
  );
}