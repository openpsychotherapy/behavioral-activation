import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Surface, IconButton, useTheme } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

import { IconMeny } from './IconMeny';
import { IconList } from './activity/IconList';
import { ActivityRegistrator } from './activity/ActivityRegistrator';

const ActivityStack = createStackNavigator();

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

const CircleButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3, backgroundColor: props.backgroundColor }}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
}

const ViewContent = ({ navigation }: any) => {
  const { colors } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const navigationButtonSize = 40;

  const iconListButton = () => {
    setVisible(true);
  };

  const historyButton = () => {
    navigation.navigate('History');
  };

  const iconSettingsButton = () => {
    navigation.navigate('IconSettings');
  };

  const iconPressCallback = (pressedIcon: Number, icon: String) => {
    console.log(pressedIcon + " - " + icon);
    setVisible(false);
    navigation.push('ActivityRegistration', { pressedIcon: pressedIcon, icon: icon });
  };

  return (
    <View style={{ flex: 1 }}>
      <IconList pressCallback={iconPressCallback} visible={visible} setVisible={setVisible} />
      <IconMeny pressCallback={iconPressCallback} />

      <View style={{ paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <CircleButton icon='menu' size={navigationButtonSize} backgroundColor={colors.accent} onPress={iconListButton} />
        <CircleButton icon='calendar-check' size={navigationButtonSize} backgroundColor={colors.accent} />
        <CircleButton icon='clock-fast' size={navigationButtonSize} backgroundColor={colors.accent} onPress={historyButton} />
      </View>
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
      <ActivityStack.Screen name="History" component={HistoryView} />
      <ActivityStack.Screen name="IconSettings" component={IconSettingsView} />
      <ActivityStack.Screen name="ActivityRegistration" component={ActivityRegistrator} />
    </ActivityStack.Navigator>
  );
}
