import React from 'react';
import { View, FlatList } from 'react-native';
import { Portal, Dialog, IconButton, useTheme, Divider } from 'react-native-paper';
import Storage from 'storage';

interface IconListProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  pressCallback: (index: number, icon: string) => void;
  iconsPerRow?: number;
  startIndex?: number;
  selectedIndex?: number;
  dividerAfterRow?: number;
}

export const IconList = (props: IconListProps) => {
  const [icons, modifyIcons] = Storage.useIcons();
  const { colors, iconSizes } = useTheme();

  const hideDialog = () => props.setVisible(false);

  const items = [];
  const iconsPerRow = props.iconsPerRow ?? 3;
  const startIndex = props.startIndex ?? 12; // Index offset to exlude default items

  let currentSegment = [];

  for (let i = startIndex; i < icons.length; ++i) {
    const value = icons[i];
    const style = (props.selectedIndex === i) ? {backgroundColor: colors.accent} : {};

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
        <View
          key={currentSegment.map(e => e.key).join()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingRight: 20,
            paddingLeft: 20
          }}
        >
          {currentSegment}
        </View>
      );

      if (props.dividerAfterRow === items.length) {
        items.push(<Divider style={{height: 2}} key="divider"/>);
      }

      currentSegment = [];
    }
  }

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={hideDialog} style={{ flex: 1, marginVertical: 80, marginHorizontal: 30 }}>
        <FlatList
          style={{ paddingVertical: 12 }}
          data={items}
          renderItem={({item}) => item}
        />
      </Dialog>
    </Portal >
  );
};
