import React from 'react';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Storage from 'storage';

export const IconMeny = (props: any) => {
  const [icons, modifyIcons] = Storage.useIcons();
  const { iconSizes } = useTheme();
  let iconSize = iconSizes.large;

  return (
    <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', paddingRight: 20, paddingLeft: 20 }}>
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton icon={icons[0 + 0 * 3]} size={iconSize} onPress={() => { props.pressCallback(0 + 0 * 3, icons[0 + 0 * 3]) }} />
        <IconButton icon={icons[0 + 1 * 3]} size={iconSize} onPress={() => { props.pressCallback(0 + 1 * 3, icons[0 + 1 * 3]) }} />
        <IconButton icon={icons[0 + 2 * 3]} size={iconSize} onPress={() => { props.pressCallback(0 + 2 * 3, icons[0 + 2 * 3]) }} />
        <IconButton icon={icons[0 + 3 * 3]} size={iconSize} onPress={() => { props.pressCallback(0 + 3 * 3, icons[0 + 3 * 3]) }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton icon={icons[1 + 0 * 3]} size={iconSize} onPress={() => { props.pressCallback(1 + 0 * 3, icons[1 + 0 * 3]) }} />
        <IconButton icon={icons[1 + 1 * 3]} size={iconSize} onPress={() => { props.pressCallback(1 + 1 * 3, icons[1 + 1 * 3]) }} />
        <IconButton icon={icons[1 + 2 * 3]} size={iconSize} onPress={() => { props.pressCallback(1 + 2 * 3, icons[1 + 2 * 3]) }} />
        <IconButton icon={icons[1 + 3 * 3]} size={iconSize} onPress={() => { props.pressCallback(1 + 3 * 3, icons[1 + 3 * 3]) }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton icon={icons[2 + 0 * 3]} size={iconSize} onPress={() => { props.pressCallback(2 + 0 * 3, icons[2 + 0 * 3]) }} />
        <IconButton icon={icons[2 + 1 * 3]} size={iconSize} onPress={() => { props.pressCallback(2 + 1 * 3, icons[2 + 1 * 3]) }} />
        <IconButton icon={icons[2 + 2 * 3]} size={iconSize} onPress={() => { props.pressCallback(2 + 2 * 3, icons[2 + 2 * 3]) }} />
        <IconButton icon={icons[2 + 3 * 3]} size={iconSize} onPress={() => { props.pressCallback(2 + 3 * 3, icons[2 + 3 * 3]) }} />
      </View>
    </View>
  );
};
