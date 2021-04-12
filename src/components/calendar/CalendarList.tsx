import React from 'react';
import { FlatList } from 'react-native';

import { Calendar } from 'storage/calendar';
import { CalendarListSection } from './CalendarListSection';

const groupByDate = (calendar: Calendar): Calendar[] => {
  let groups: Calendar[] = [];
  let currentGroup: Calendar = [];
  let date = "";

  calendar.forEach((entry) => {
    if (entry.date == date) {
      currentGroup.push(entry);
    } else {
      if (currentGroup.length !== 0){
        groups.push(currentGroup);
      }
      currentGroup = [entry];
      date = entry.date;
    }
  });

  if (currentGroup.length !== 0) {
    groups.push(currentGroup);
  }

  return groups;
}

export const CalendarList: React.FC<{calendar: Calendar}> = ({ calendar }) => {
  const groups = groupByDate(calendar);
  return (
    <FlatList
      data={groups}
      renderItem={({item, index, separators}) => {
        return (
        <CalendarListSection entries={item}/>
      )}}
    >
    </FlatList>
  );
}
