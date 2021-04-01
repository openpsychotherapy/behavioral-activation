import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

import { IconMeny } from './IconMeny';

const ActivityStack = createStackNavigator();

const IconListView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Icon list</Text>
  </View>
);

const HistoryView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>History</Text>
  </View>
);

const IconSettingsView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Icon Settings</Text>
  </View>
);

const ViewContent = ({ navigation }: any) => {
  return (
    <IconMeny navigation={navigation} />
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
      <ActivityStack.Screen name="IconList" component={IconListView} />
      <ActivityStack.Screen name="History" component={HistoryView} />
      <ActivityStack.Screen name="IconSettings" component={IconSettingsView} />
    </ActivityStack.Navigator>
  );
}