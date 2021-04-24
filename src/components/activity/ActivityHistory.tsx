import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Text, Surface, List, Caption, FAB, Title, useTheme } from 'react-native-paper';

import { useTranslation } from 'language/LanguageProvider';

import Storage from 'storage';

// import AsyncStorage from '@react-native-async-storage/async-storage'


// Returns a date base on ISO string and adds an hour offset
const getDateFromStringWithOffset = (value: string, offset: number) => {
  let date = new Date(value);
  date.setHours(offset);
  return date;
};

export const ActivityHistory = ({navigation}: any) => {
  const [activities, modifyActivities] = Storage.useActivities();
  const [settings, modifySettings] = Storage.useSettings();
  const lang = useTranslation();
  const { colors } = useTheme();

  let historyItems: any = [];

  const [currentDay, setCurrentDay] = React.useState(activities.length-1); // TODO: Default to current day

  // Formats a date into a locale time string.
  const getFormattedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
  };

  let titleString = '';
  let dayRating = '';
  
  if (activities.length !== 0) {
    const day = activities[currentDay];

    // Save month as string
    const date = new Date(day.date);
    titleString = Intl.DateTimeFormat(settings.language, { dateStyle: 'long'}).format(date);
    // Set rating
    dayRating = day.score == null ? '' : day.score.toString();

    let activityCount = 0; // Used for merging activities
    for (let activityIndex = 0; activityIndex < day.entries.length; ++activityIndex) {
      const activity = day.entries[activityIndex];
      
      // Ignore if null
      if (activity == null) {
        continue;
      }

      // const haveNext = activityIndex+1 < day.entries.length;
      // const isNextValid = day.entries[activityIndex+1] != null;
      // const isNextSame = JSON.stringify(activity) === JSON.stringify(day.entries[activityIndex+1]);

      // Check if we have a valid next element
      if (activityIndex+1 < day.entries.length && day.entries[activityIndex+1] != null && JSON.stringify(activity) === JSON.stringify(day.entries[activityIndex+1])) {
        // Continue segment
        ++activityCount;
        continue;
      }
      

      // Apply segment
      const fromDate = getDateFromStringWithOffset(day.date, activityIndex-activityCount);
      const toDate = getDateFromStringWithOffset(day.date, activityIndex+1);
      const fromTimeString = getFormattedTime(fromDate);
      const toTimeString = getFormattedTime(toDate);

      historyItems.push(
        <Surface key={'hi_' + fromDate.toString()} style={{ flexDirection: 'row', borderRadius: 5, elevation: 5, marginHorizontal: 10 , marginVertical: 5 }}>
          <List.Item style={{flex: 1, flexGrow: 1 }} title={fromTimeString + ' - ' + toTimeString} description={activity.text} right={() =>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Caption>{activity.importance + ' | ' + activity.enjoyment}</Caption>
              <List.Icon icon={activity.icon}/>
            </View>
          }/>
        </Surface>
      );
      
      // Reset segment
      activityCount = 0;
    }
  }

  const onRateDay = () => {
    if (activities.length !== 0) {
      navigation.push('RateDay', { date: activities[currentDay].date });
    }
  };

  const onMonthPressed = () => {
    console.log('Month');
  };

  return (
    <View style={{flex: 1}}>
      {/* Title bar */}
      <Surface style={{ elevation: 10, flexDirection: 'row', alignItems:'center'}}>
        {/* Title */}
        <Pressable style={{ flexGrow: 1, paddingHorizontal: 20, paddingVertical: 10 }} onPress={onMonthPressed}>
          <Title>{titleString}</Title>
        </Pressable>

        {/* Day rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ paddingVertical: 2, paddingHorizontal: 4, borderRadius: 20, borderWidth: 2, borderColor: colors.placeholder, minWidth: 50, alignItems: 'center', justifyContent: 'center'}}>
            <Title>{dayRating}</Title>
          </View>
          <List.Icon icon='star'/>
        </View>
      </Surface>

      {/* List */}
      <FlatList style={{}} data={historyItems} renderItem={({item}) => item}
        contentContainerStyle={{
          paddingBottom: 75
        }}
      />

      {/* FAB + container */}
      <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }}>
        <FAB icon='check'
          label={lang.activityHistoryRateDayLabel}
          style={{ margin: 16 }}
          onPress={() => onRateDay()}
        />
      </View>
    </View>
  );
};
