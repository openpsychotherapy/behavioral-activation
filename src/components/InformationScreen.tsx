import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

const InformationStack = createStackNavigator();

function ViewContent() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Information</Text>
      </View>
    </View>
  );
}

export function InformationScreen() {
  return (
    <View style={{ flex: 1 }}>
      <InformationStack.Navigator initialRouteName="Information" headerMode="float"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <InformationStack.Screen name="Information" component={ViewContent} />
      </InformationStack.Navigator>
    </View>
  );
}
