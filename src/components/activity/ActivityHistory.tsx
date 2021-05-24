import React from 'react';
import { View, FlatList } from 'react-native';
import { Surface, List, Caption, FAB, Title, useTheme, TouchableRipple } from 'react-native-paper';

import { useTranslation } from 'language/LanguageProvider';

import { RatingCircle } from './../RatingCircle';

import Storage from 'storage';
import { ActivitiesDay, ActivitiesEntry } from 'storage/types';
import { ActivityStackParamList } from '../ActivityScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Returns a date base on ISO string and adds an hour offset
const getDateFromStringWithOffset = (value: string, offset: number) => {
  let date = new Date(value);
  date.setHours(offset);
  return date;
};

type Route = RouteProp<
  ActivityStackParamList,
  'History'
>;
type Navigation = StackNavigationProp<
  ActivityStackParamList,
  'History'
>;

interface Props {
  route: Route;
  navigation: Navigation;
}

export const ActivityHistory = ({ route, navigation }: Props) => {
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

      historyItems.push({
        activity: activity,
        activityStartIndex: activityIndex-activityCount,
        activityEndIndex: activityIndex,
        day: day,
        fromDate: fromDate,
        toDate: toDate,
        fromTimeString: fromTimeString,
        toTimeString: toTimeString
      });

      // Reset segment
      activityCount = 0;
    }
  }

  const onRateDay = () => {
    if (activities.length !== 0) {
      navigation.navigate('RateDay', { date: activities[currentDay].date });
    }
  };

  const onMonthPressed = () => {
    navigation.navigate('WeekHistory', { currentDay: currentDay });
  };

  // Callback for item press
  const onModifyDate = (day: ActivitiesDay, activity: ActivitiesEntry, activityStartIndex: number, activityEndIndex: number) => {
    navigation.navigate('ActivityRegistration', {
      icon: activity.icon,
      entry: activity,
      entryStartIndex: activityStartIndex,
      entryEndIndex: activityEndIndex,
      day: day
    });
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
      <FlatList style={{}}
        data={historyItems}
        contentContainerStyle={{
          paddingBottom: 75
        }}
        keyExtractor={(item) => 'hi_' + item.fromDate.toString()}
        renderItem={({item}) => 
          <Surface  style={{ borderRadius: 5, elevation: elevation.medium, marginHorizontal: 10 , marginVertical: 5 }}>
            <TouchableRipple onPress={() => onModifyDate(item.day, item.activity, item.activityStartIndex, item.activityEndIndex)} style={{ flexDirection: 'row' }}>
              <List.Item style={{flex: 1, flexGrow: 1 }} title={item.fromTimeString + ' - ' + item.toTimeString} description={item.activity.text} right={() =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Caption>{item.activity.importance + ' | ' + item.activity.enjoyment}</Caption>
                  <List.Icon icon={item.activity.icon}/>
                </View>
              }/>
            </TouchableRipple>
          </Surface>
        }
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
