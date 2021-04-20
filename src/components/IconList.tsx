import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Portal, Dialog, IconButton, useTheme } from 'react-native-paper';
import Storage from 'storage';

export const IconList = (props: any) => {
  const [icons, modifyIcons] = Storage.useIcons();
  const { colors, iconSizes } = useTheme();

  const hideDialog = () => props.setVisible(false);

  const items = [];
  const iconsPerRow = props.iconsPerRow ?? 3;
  const startIndex = props.startIndex ?? 12; // Index offset to exlude default items
  const selectedIndex = props.selectedIndex ?? null;

  let currentSegment = [];

  for (let i = startIndex; i < icons.length; ++i) {
    const value = icons[i];
    const style = (selectedIndex === i) ? {backgroundColor: colors.accent} : {};

    // Add iconbutton to current segment
    currentSegment.push(
      <IconButton
        style={style}
        key={value}
        icon={value}
        size={(iconSizes.medium + iconSizes.large) / 2}
        onPress={() => { props.pressCallback(i, icons[i]) }}
      />
    );

    // Complete segment if we have enough items or we reached the end
    if (i !== 0 && ((i + 1) % iconsPerRow === 0 || i === icons.length - 1)) {
      items.push(
        <View key={currentSegment.map(e => e.key).join()} style={{ flexDirection: 'row', justifyContent: 'center', paddingRight: 20, paddingLeft: 20 }}>
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
