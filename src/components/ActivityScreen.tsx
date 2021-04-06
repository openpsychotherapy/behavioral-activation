import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

const ActivityStack = createStackNavigator();

const ViewContent = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calendar</Text>
    </View>
  );
}

export const ActivityScreen = ({ navigation }: any) => {
  return (
    <ActivityStack.Navigator initialRouteName="Activities" headerMode="float"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <ActivityStack.Screen name="Activities" component={ViewContent} />
    </ActivityStack.Navigator>
  );
}