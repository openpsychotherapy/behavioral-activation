import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Text, Surface, List, Caption, FAB, Title, Headline, useTheme } from 'react-native-paper';

import { useTranslation } from 'language/LanguageProvider';

import { RatingCircle } from './../RatingCircle';

import Storage from 'storage';

// import AsyncStorage from '@react-native-async-storage/async-storage'


// Returns a date base on ISO string and adds an hour offset
const getDateFromStringWithOffset = (value: string, offset: number) => {
  let date = new Date(value);
  date.setHours(offset);
  return date;
};

export const ActivityWeekHistory = ({navigation}: any) => {
  const [activities, modifyActivities] = Storage.useActivities();
  const [settings, modifySettings] = Storage.useSettings();
  const lang = useTranslation();

  let historyItems = [];

  // Formats a date into a locale time string.
  const getFormattedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
  };

  const countActivities = (day: any) => {
    let activityCount = 0;
    for (let activityIndex = 0; activityIndex < day.entries.length; ++activityIndex) {
      if (day.entries[activityIndex] == null) continue;
      // Check if we have a valid next element
      if (activityIndex+1 < day.entries.length && day.entries[activityIndex+1] != null && JSON.stringify(day.entries[activityIndex]) === JSON.stringify(day.entries[activityIndex+1])) {
        continue;
      }
      ++activityCount;
    }
    return activityCount
  };
  
  for (let activityIndex = 0; activityIndex < activities.length; ++activityIndex) {
    const day = activities[activityIndex];

    // Save month as string
    const date = new Date(day.date);
    const options: any = { dateStyle: "long" };

    historyItems.push(
      <Pressable key={'whi_' + activityIndex} onPress={() => onDayPressed(activityIndex)}>
        <Surface style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, elevation: 5, marginHorizontal: 10 , marginVertical: 5 }}>
          {/* Date number */}
          <View style={{flexGrow: 1, alignItems: 'center'}}>
            <Headline>{date.getDate()}</Headline>
          </View>

          {/* Rating */}
          <View style={{flexGrow: 2, alignItems: 'center', justifyContent: 'center', paddingVertical: 5}}>
            <Text>{lang.activityWeekHistoryRateDay}</Text>
            {/* Colored rating */}
            <RatingCircle score={day.score}/>
          </View>

          {/* Activity count */}
          <View style={{flexGrow: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{lang.activityWeekHistoryNumberOfActivities}</Text>
              <Title style={{ paddingVertical: 2 }}>{countActivities(day)}</Title>
          </View>
        </Surface>
      </Pressable>
    );
  }

  const onDayPressed = (dayIndex: number) => {
    navigation.push('History', { currentDay: dayIndex });
  };

  return (
    <View style={{flex: 1}}>
      {/* Title bar */}
      <Surface style={{ elevation: 10, flexDirection: 'row', alignItems:'center'}}>
        {/* Title */}
        <Pressable style={{ flexGrow: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
          <Title>{"titleString"}</Title>
        </Pressable>
      </Surface>

      {/* List */}
      <FlatList style={{}} data={historyItems} renderItem={({item}) => item}
        contentContainerStyle={{
          paddingBottom: 75
        }}
      />
    </View>
  );
};
