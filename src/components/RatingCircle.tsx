import React from 'react';
import { View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';

export const RatingCircle = (props: {score: number | null}) => {
  const { gradingColors } = useTheme();

  let color = gradingColors[props.score ?? 11]; // 11 represents empty

  return (
    <View style={{
        paddingVertical: 2,
        borderRadius: 22.5,
        borderWidth: 2,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color
      }}
    >
      <Title>{props.score == null ? ' ' : props.score}</Title>
    </View>
  );
};
