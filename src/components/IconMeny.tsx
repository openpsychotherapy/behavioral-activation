import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Storage from 'storage';

export const IconMeny = (props: any) => {
  const [icons, modifyIcons] = Storage.useIcons();
  let iconSize = 60;

  return (
    <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', paddingRight: 20, paddingLeft: 20 }}>
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton icon={icons[0 + 0 * 4]} size={iconSize} onPress={() => { props.pressCallback(0, icons[0 + 0 * 4]) }} />
        <IconButton icon={icons[1 + 0 * 4]} size={iconSize} onPress={() => { props.pressCallback(1, icons[1 + 0 * 4]) }} />
        <IconButton icon={icons[2 + 0 * 4]} size={iconSize} onPress={() => { props.pressCallback(2, icons[2 + 0 * 4]) }} />
        <IconButton icon={icons[3 + 0 * 4]} size={iconSize} onPress={() => { props.pressCallback(3, icons[3 + 0 * 4]) }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton icon={icons[0 + 1 * 4]} size={iconSize} onPress={() => { props.pressCallback(0 + 1 * 4, icons[0 + 1 * 4]) }} />
        <IconButton icon={icons[1 + 1 * 4]} size={iconSize} onPress={() => { props.pressCallback(1 + 1 * 4, icons[1 + 1 * 4]) }} />
        <IconButton icon={icons[2 + 1 * 4]} size={iconSize} onPress={() => { props.pressCallback(2 + 1 * 4, icons[2 + 1 * 4]) }} />
        <IconButton icon={icons[3 + 1 * 4]} size={iconSize} onPress={() => { props.pressCallback(3 + 1 * 4, icons[3 + 1 * 4]) }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <IconButton icon={icons[0 + 2 * 4]} size={iconSize} onPress={() => { props.pressCallback(0 + 2 * 4, icons[0 + 2 * 4]) }} />
        <IconButton icon={icons[1 + 2 * 4]} size={iconSize} onPress={() => { props.pressCallback(1 + 2 * 4, icons[1 + 2 * 4]) }} />
        <IconButton icon={icons[2 + 2 * 4]} size={iconSize} onPress={() => { props.pressCallback(2 + 2 * 4, icons[2 + 2 * 4]) }} />
        <IconButton icon={icons[3 + 2 * 4]} size={iconSize} onPress={() => { props.pressCallback(3 + 2 * 4, icons[3 + 2 * 4]) }} />
      </View>
    </View>
  );
};
