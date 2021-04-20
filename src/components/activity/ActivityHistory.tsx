import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Surface, List, Caption } from 'react-native-paper';

import Storage from 'storage';

// Returns a date base on ISO string and adds an hour offset
const getDateFromStringWithOffset = (value: string, offset: number) => {
  let date = new Date(value);
  date.setHours(offset);
  return date;
};

export const ActivityHistory = () => {
  const [activities, modifyActivities] = Storage.useActivities();
  const [settings, modifySettings] = Storage.useSettings();

  let historyItems: any = [];

  const [currentDay, setCurrentDay] = React.useState(activities.length-1); // TODO: Default to current day

  // Formats a date into a locale time string.
  const getFormattedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
  };

  if (activities.length !== 0) {
    const day = activities[currentDay];

    let lastActivity = null; // Used for merging activities
    for (let activityIndex = 0; activityIndex < day.entries.length; ++activityIndex) {
      const activity = day.entries[activityIndex];
      if (!activity || lastActivity === activity) continue;
      lastActivity = activity;
      const date = getDateFromStringWithOffset(day.date, activityIndex);
      const timeString = getFormattedTime(date);

      historyItems.push(
        <Surface key={'hi_' + date.toString()} style={{ flexDirection: 'row', borderRadius: 5, elevation: 5, marginHorizontal: 10 , marginVertical: 5 }}>
          <List.Item style={{flex: 1, flexGrow: 1 }} title={timeString} description={activity.text} right={() =>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Caption>{activity.importance + ' | ' + activity.enjoyment}</Caption>
              <List.Icon icon={activity.icon}/>
            </View>
          }/>
        </Surface>
      );
    }
  }
  else {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>No activities added yet</Text>
      </View>
    );
  }
  
  return (
    <View style={{flex: 1}}>
      <FlatList style={{}} data={historyItems} renderItem={({item}) => item}/>
    </View>
  );
};
