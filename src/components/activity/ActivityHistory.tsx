import React from 'react';
import { View, FlatList } from 'react-native';
import { Surface, List, Caption, FAB, Title, useTheme, TouchableRipple } from 'react-native-paper';

import { useTranslation } from 'language/LanguageProvider';

import { RatingCircle } from './../RatingCircle';

import Storage from 'storage';
import { ActivitiesDay, ActivitiesEntry } from 'storage/types';

// Returns a date base on ISO string and adds an hour offset
const getDateFromStringWithOffset = (value: string, offset: number) => {
  let date = new Date(value);
  date.setHours(offset);
  return date;
};

export const ActivityHistory = ({route, navigation}: any) => {
  const [activities, modifyActivities] = Storage.useActivities();
  const [settings, modifySettings] = Storage.useSettings();
  const lang = useTranslation();
  const { elevation } = useTheme();

  let historyItems = [];

  const [currentDay, setCurrentDay] = React.useState(activities.length-1);

  React.useEffect(() => {
    if (route.params && route.params.currentDay !== -1) {
      setCurrentDay(route.params.currentDay);
      navigation.setParams({currentDay: -1});
    }
  }, [route.params]);

  // Formats a date into a locale time string.
  const getFormattedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
  };

  let titleString = '';
  let dayRating = null;

  if (activities.length !== 0) {
    const day = activities[currentDay];

    // Save month as string
    const date = new Date(day.date);
    const options: any = { dateStyle: 'long' };
    titleString = Intl.DateTimeFormat(settings.language, options).format(date);
    // Set rating
    dayRating = day.score;

    // Callback for item press
    const onModifyDate = (day: ActivitiesDay, activity: ActivitiesEntry) => {
      navigation.push('ActivityRegistration', { icon: activity.icon, entry: activity, day: day, modify: true });
    }


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
        <Surface key={'hi_' + fromDate.toString()} style={{ borderRadius: 5, elevation: elevation.medium, marginHorizontal: 10 , marginVertical: 5 }}>
          <TouchableRipple onPress={() => onModifyDate(day, activity)} style={{ flexDirection: 'row' }}>
            <List.Item style={{flex: 1, flexGrow: 1 }} title={fromTimeString + ' - ' + toTimeString} description={activity.text} right={() =>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Caption>{activity.importance + ' | ' + activity.enjoyment}</Caption>
                <List.Icon icon={activity.icon}/>
              </View>
            }/>
          </TouchableRipple>
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
    navigation.push('WeekHistory', { currentDay: currentDay });
  };

  return (
    <View style={{flex: 1}}>
      {/* Title bar */}
      <Surface style={{ elevation: elevation.large, flexDirection: 'row', alignItems:'center'}}>
        {/* Title */}
        <View style={{ flexGrow: 1, alignItems: 'baseline'}}>
          <TouchableRipple onPress={onMonthPressed}>
            <View style={{ flexDirection:'row', alignItems: 'center', paddingRight: 20}}>
              <List.Icon icon='calendar-week'/>
              <Title>{titleString}</Title>
            </View>
          </TouchableRipple>
        </View>

        {/* Day rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableRipple onPress={() => onRateDay()}>
            <RatingCircle score={dayRating}/>
          </TouchableRipple>
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
          label={dayRating == null ? lang.activityHistoryRateDayLabel : lang.activitiesButtonRateDayModify}
          style={{ margin: 16 }}
          onPress={() => onRateDay()}
        />
      </View>
    </View>
  );
};
