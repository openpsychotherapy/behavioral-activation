import React from 'react';
import { Surface, IconButton } from 'react-native-paper';

interface CircleButtonProps {
    icon: string;
    size: number;
    backgroundColor: string;
    onPress: () => void;
  }
    
export const CircleButton = (props: CircleButtonProps) => {
    return (
      <Surface style={{ borderRadius: 100, elevation: 3, backgroundColor: props.backgroundColor }}>
        <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
      </Surface >
    );
  }