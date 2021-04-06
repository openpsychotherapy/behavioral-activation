import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

const CalendarStack = createStackNavigator();

const ViewContent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calendar</Text>
    </View>
  );
}

export const CalendarScreen = () => {
  return (
    <CalendarStack.Navigator initialRouteName="Calendar" headerMode="float"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <CalendarStack.Screen name="Calendar" component={ViewContent} />
    </CalendarStack.Navigator>
  );
}