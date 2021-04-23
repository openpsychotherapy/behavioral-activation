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

    let activityCount = 0; // Used for merging activities
    for (let activityIndex = 0; activityIndex < day.entries.length; ++activityIndex) {
      const activity = day.entries[activityIndex];
      
      const outside = activityIndex+1-day.entries.length === 0;
      
      // Should check if the comming activity is null not the current.
      const shouldBreak = !activity || outside || (!outside && activity !== day.entries[activityIndex+1]);

      if (!shouldBreak) {
        // Don't break streak
        ++activityCount;
        continue;
      }

      // Apply segment
      const fromDate = getDateFromStringWithOffset(day.date, activityIndex-activityCount);
      const toDate = getDateFromStringWithOffset(day.date, activityIndex);
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
