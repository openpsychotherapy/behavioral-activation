import React from 'react';
import { View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';

export const RatingCircle = (props: {score: number | null}) => {
  const { gradingColors } = useTheme();

  let color = gradingColors[props.score != null ? props.score : 11]; // 11 represents empty

  return (
    <View style={{
        paddingVertical: 2,
        borderRadius: 20,
        borderWidth: 2,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color
      }}
    >
      <Title>{props.score == null ? " " : props.score}</Title>
    </View>
  );
};