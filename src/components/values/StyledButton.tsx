import React from 'react';
import { Button, Text, useTheme } from 'react-native-paper';

interface StyledButtonProps {
  categoryButton: () => void;
  name: string;

}

export const StyledButton = (props: StyledButtonProps) => {
  const { colors, roundness } = useTheme();

  return (
    <Button
      style={{ justifyContent: 'center' }}
      contentStyle={{ height: 50 }}
      theme={{ roundness: roundness }}
      compact={true}
      mode='contained'
      onPress={props.categoryButton}
      color={colors.surface}
    >
      <Text>{props.name}</Text>
    </Button>
  );
}
