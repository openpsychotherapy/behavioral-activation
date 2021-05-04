import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const ActivityRateDay = ({ route, navigation } : any) =>{

  const lang = useTranslation();
  const [activities, modifyActivities] = Storage.useActivities();

  const [rateOfDay, setRateOfDay] = React.useState(5);
  const { iconSizes, colors } = useTheme();

  const onConfirm = () => {
    modifyActivities.setRating(route.params.date, rateOfDay);
    
    // Go back
    navigation.navigate('History');
  };


  const onCancel = () => {
    // Go back
    navigation.navigate('History');
  };

  return(
    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'column',  justifyContent: 'space-around'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
        <View style={{flexDirection: 'column', width: '80%'}}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{lang.activityHistoryRateDayLabel + ': '}</Text>
            <Text>{rateOfDay}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text>0</Text>
            <Slider
              style={{flex: 1}} value={5} step={1}
              minimumValue={0} maximumValue={10}
              onValueChange={(value: number) => {setRateOfDay(value)}}
              minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
            />
            <Text>10</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
        <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
      </View>
    </View>
  );
};
