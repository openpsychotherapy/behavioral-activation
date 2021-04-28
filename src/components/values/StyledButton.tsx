import React from 'react';
import { Button, Text } from 'react-native-paper';

interface StyledButtonProps {
  categoryButton: () => void;
  name: string;
}

export const StyledButton = (props: StyledButtonProps) => {
  return (
    <Button
      style={{ justifyContent: 'center' }}
      contentStyle={{ height: 50 }}
      theme={{ roundness: 30 }}  
      compact={true}
      mode='outlined'
      onPress={props.categoryButton}
    >
      <Text>{props.name}</Text>
    </Button>
  );
}