import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const ActivityPlanningRate = ({ navigation }: any) => {

  const lang = useTranslation();
  const [importance, setImportance] = React.useState(5);
  const [enjoyment, setEnjoyment] = React.useState(5);

  const { iconSizes, colors } = useTheme();

  const onConfirm = () => {
    //modify data

    // Go back
    navigation.navigate('RegisterPlanning');
  };


  const onCancel = () => {
    // Go back
    navigation.navigate('RegisterPlanning');
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
        <View style={{ flexDirection: 'column', width: '80%' }}>

            {/*Importance slider */}
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 40}}>
              <View style={{flexDirection: 'column', width: '80%'}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{lang.activityRegistratorImporanceLabel + ': '}</Text>
                  <Text>{importance}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text>0</Text>
                  <Slider
                    style={{flex: 1}} value={5} step={1}
                    minimumValue={0} maximumValue={10}
                    onValueChange={(value: number) => {setImportance(value)}}
                    minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
                  />
                  <Text>10</Text>
                </View>
              </View>
            </View>

            {/* Enjoyment slider */}
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 40}}>
              <View style={{flexDirection: 'column', width: '80%'}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{lang.activityRegistratorEnjoymentLabel + ': '}</Text>
                  <Text>{enjoyment}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text>0</Text>
                  <Slider
                    style={{flex: 1}} value={5} step={1}
                    minimumValue={0} maximumValue={10}
                    onValueChange={(value: number) => {setEnjoyment(value)}}
                    minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
                  />
                <Text>10</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
        <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
      </View>
    </View>
  );
}