import { useTranslation } from 'language/LanguageProvider';
import React from 'react';
import { FlatList } from 'react-native';
import { Divider, Title } from 'react-native-paper';

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

const insertMonthHeaders = (groups: Calendar[], dict: any): (Calendar | string)[] => {
  let newGroups: (Calendar | string)[] = [];
  let currentMonth = "";

  groups.forEach(group => {
    const month = group[0].date.slice(0, 7);
    if (month !== currentMonth) {
      newGroups.push(`${dict.months[new Date(month).getMonth()]} ${month.slice(0, 4)}`);
    }
    newGroups.push(group);
    currentMonth = month;
  });

  return newGroups;
}

export const CalendarList: React.FC<{calendar: Calendar}> = ({ calendar }) => {
  const dict = useTranslation();
  const groups = insertMonthHeaders(groupByDate(calendar), dict);
  return (
    <FlatList
      data={groups}
      renderItem={({item, index, separators}) => {
        return (
          typeof(item) === "string" ? (
            <>
            <Divider/>
            <Title style={{ fontSize: 30, textAlign: 'center', marginVertical: 10 }}>{item}</Title>
            <Divider/>
            </>
          ) :
          (
            <CalendarListSection entries={item}/>
          )
      )}}
    >
    </FlatList>
  );
}
