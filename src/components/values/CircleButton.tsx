import React from 'react';
import { Surface, IconButton, useTheme } from 'react-native-paper';

interface CircleButtonProps {
  icon: string;
  size: number;
  backgroundColor: string;
  onPress: () => void;
}

export const CircleButton = (props: CircleButtonProps) => {
  const { elevation } = useTheme();

  return (
    <Surface style={{ borderRadius: 100, elevation: elevation.small, backgroundColor: props.backgroundColor }}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
}
