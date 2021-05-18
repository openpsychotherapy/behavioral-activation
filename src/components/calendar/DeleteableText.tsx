import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

interface Props {
  text: string;
  setText: (text: string) => void;
}

export const DeleteableText = ({ text, setText }: Props) => {
  const { colors, iconSizes } = useTheme();
  return (
    <Button
      uppercase={false}
      contentStyle={{ flexDirection: 'row-reverse' }}
      mode='outlined'
      icon='delete'
      onPress={() => setText('')}>
      {text}
    </Button>
  );
}
