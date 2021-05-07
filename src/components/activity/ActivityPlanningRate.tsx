import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const ActivityPlanningRate = ({ navigation }: any) => {

  const lang = useTranslation();

  const { iconSizes, colors } = useTheme();

  const onConfirm = () => {
    // Go back
    navigation.navigate('History');
  };


  const onCancel = () => {
    // Go back
    navigation.navigate('History');
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'column', justifyContent: 'space-around' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'column', width: '80%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{lang.activityHistoryRateDayLabel + ': '}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>0</Text>
            <Slider

            />
            <Text>10</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
        <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
      </View>
    </View>
  );
}