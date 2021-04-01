import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, IconButton, Colors, useTheme } from 'react-native-paper';

const icons = [
  "format-text",
  "bed-empty",
  "brush",
  "dumbbell",

  "food-fork-drink",
  "account-supervisor",
  "nature",
  "music",

  "run",
  "gamepad-variant",
  "chat",
  "car"
];

const CircleButton = (props: any) => {
  return (
    <View style={{ borderRadius: 100, backgroundColor: props.backgroundColor }}>
      <IconButton
        icon={props.icon}
        size={props.size}
        onPress={props.onPress}
      />
    </View>
  );
}


export const IconMeny = (props: any) => {
  const { colors } = useTheme();

  let iconSize = 60;
  let navigationButtonSize = 40;

  const iconListButton = () => {
    props.navigation.navigate('IconList');
  };

  const historyButton = () => {
    props.navigation.navigate('History');
  };

  const iconSettingsButton = () => {
    props.navigation.navigate('IconSettings');
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'stretch' }}>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <IconButton icon={icons[0]} size={iconSize} />
          <IconButton icon={icons[1]} size={iconSize} />
          <IconButton icon={icons[2]} size={iconSize} />
          <IconButton icon={icons[3]} size={iconSize} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <IconButton icon={icons[0 + 1 * 4]} size={iconSize} />
          <IconButton icon={icons[1 + 1 * 4]} size={iconSize} />
          <IconButton icon={icons[2 + 1 * 4]} size={iconSize} />
          <IconButton icon={icons[3 + 1 * 4]} size={iconSize} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <IconButton icon={icons[0 + 2 * 4]} size={iconSize} />
          <IconButton icon={icons[1 + 2 * 4]} size={iconSize} />
          <IconButton icon={icons[2 + 2 * 4]} size={iconSize} />
          <IconButton icon={icons[3 + 2 * 4]} size={iconSize} />
        </View>
      </View>

      <View style={{ flexGrow: 0, paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <CircleButton icon='menu' size={navigationButtonSize} backgroundColor={colors.accent} onPress={iconListButton} />
        <CircleButton icon='clock-fast' size={navigationButtonSize} backgroundColor={colors.accent} onPress={historyButton} />
        <CircleButton icon='wrench' size={navigationButtonSize} backgroundColor={colors.accent} onPress={iconSettingsButton} />
      </View>
    </View>
  );
};
