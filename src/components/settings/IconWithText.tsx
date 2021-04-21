import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export const IconWithText: React.FC<{icon: string, text: string}> = ({icon, text}) => {
  return (
    <View style={styles.iconWithText}>
      <IconButton icon={icon}/>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    iconWithText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
