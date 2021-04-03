import React from 'react';
import { View, ScrollView } from 'react-native';
import { Portal, Dialog, IconButton, useTheme, } from 'react-native-paper';
import Storage from 'storage';

export const IconList = (props: any) => {
  const [icons, modifyIcons] = Storage.useIcons();
  const { iconSizes } = useTheme();

  const hideDialog = () => props.setVisible(false);

  const items = [];
  const iconsPerRow = 3;
  const startIndex = 12; // Index offset to exlude default items

  let currentSegment = [];

  for (let i = startIndex; i < icons.length; ++i) {
    const value = icons[i];

    // Add iconbutton to current segment
    currentSegment.push(
      <IconButton key={'item' + i} icon={value} size={iconSizes.large} onPress={() => { props.pressCallback(i, icons[i]) }} />
    );

    // Complete segment if we have enough items or we reached the end
    if (i !== 0 && ((i + 1) % iconsPerRow === 0 || i === icons.length - 1)) {
      items.push(
        <View key={'group' + i} style={{ flexDirection: 'row', justifyContent: 'center', paddingRight: 20, paddingLeft: 20 }}>
          {currentSegment}
        </View>
      );

      currentSegment = [];
    }
  }

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={hideDialog} style={{ flex: 1, marginVertical: 80, marginHorizontal: 30 }}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
            {items}
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal >
  );
};

