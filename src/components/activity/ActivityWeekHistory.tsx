import React from 'react';
import { View, FlatList, Pressable, LayoutChangeEvent } from 'react-native';
import { Text, Surface, Title, Headline, Subheading, useTheme } from 'react-native-paper';

import { useTranslation } from 'language/LanguageProvider';

import { RatingCircle } from './../RatingCircle';

import Storage from 'storage';

import { ActivityStackParamList } from '../ActivityScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ActivitiesDay } from 'storage/types';

type Route = RouteProp<
  ActivityStackParamList,
  'WeekHistory'
>;
type Navigation = StackNavigationProp<
  ActivityStackParamList,
  'WeekHistory'
>;

interface Props {
  route: Route;
  navigation: Navigation;
}

export const ActivityWeekHistory = ({ route, navigation }: Props) => {
  const [activities, modifyActivities] = Storage.useActivities();
  const [settings, modifySettings] = Storage.useSettings();
  const lang = useTranslation();
  const { elevation } = useTheme();

  let historyItems = [];

  const countActivities = (day: ActivitiesDay) => {
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

  const [layoutSize, setLayoutSize] = React.useState({ 'width': 0, 'height': 0 });

  const onSaveSize = (event: LayoutChangeEvent) => {
    let {width, height} = event.nativeEvent.layout;
    setLayoutSize({ 'width': width, 'height': height })
  };

  const getItemLayout = (data: any, index: number) => {
      return {length: layoutSize.height, offset: layoutSize.height * index, index};
  };

  for (let activityIndex = 0; activityIndex < activities.length; ++activityIndex) {
    const day = activities[activityIndex];

    // Save month as string
    const date = new Date(day.date);

    const monthName = Intl.DateTimeFormat(settings.language, { month: 'short' }).format(date);

    historyItems.push(
      <Pressable onLayout={onSaveSize} key={'whi_' + activityIndex} onPress={() => onDayPressed(activityIndex)}>
        <Surface style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, elevation: elevation.medium, marginHorizontal: 10 , marginVertical: 5 }}>
          {/* Date number */}
          <View style={{flexGrow: 1, alignItems: 'center', minWidth: 40}}>
            <Subheading>{monthName}</Subheading>
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
      {/* List */}
      <FlatList style={{}} data={historyItems} renderItem={({item}) => item}
        contentContainerStyle={{
          paddingBottom: '40%'
        }}
        initialScrollIndex={route.params.currentDay}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};
