import { useTranslation } from 'language/LanguageProvider';
import React, { useEffect, useState } from 'react';
import { FlatList} from 'react-native';
import { Divider, Title } from 'react-native-paper';

import { Calendar, entryGt } from 'storage/calendar';
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

const insertMonthHeaders = (groups: Calendar[]): (Calendar | string)[] => {
  let newGroups: (Calendar | string)[] = [];
  let currentMonth = "";

  groups.forEach(group => {
    const month = group[0].date.slice(0, 7);
    if (month !== currentMonth) {
      newGroups.push(month);
    }
    newGroups.push(group);
    currentMonth = month;
  });

  return newGroups;
}

const ISODate = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

type ListState = {groups: Calendar[], entryCount: number};

export const CalendarList: React.FC<{calendar: Calendar}> = ({ calendar }) => {
  const [listState, setListState] = useState<ListState>({groups: [], entryCount: 0});
  const dict = useTranslation();

  useEffect(() => {
    const today = ISODate();
    const upcomingEntries = calendar.filter(entry => entryGt(entry, {...entry, date: today, start: "00:00"}))
    setListState({
      groups: groupByDate(upcomingEntries),
      entryCount: upcomingEntries.length,
    });
  }, [calendar]);

  const onRefresh = async () => {
    let daysToAdd = 10;
    let newEntries = [];
    let index = calendar.length - 1 - listState.entryCount;
    while (index >= 0 && daysToAdd > 0) {
      let date = calendar[index].date;
      while (index >= 0 && calendar[index].date === date) {
        newEntries.push(calendar[index]);
        index--;
      }
      daysToAdd--;
    }
    setListState({
      groups: [
        ...groupByDate(newEntries.reverse()),
        ...listState.groups
      ],
      entryCount: listState.entryCount + newEntries.length,
    });
  }

  return (
    <FlatList
      data={insertMonthHeaders(listState.groups)}
      refreshing={false}
      onRefresh={onRefresh}
      keyExtractor={(item) => JSON.stringify(item)}
      renderItem={({item, index, separators}) =>
        typeof(item) === "string" ? (
          <>
            <Divider/>
            <Title style={{ fontSize: 30, textAlign: 'center', marginVertical: 10 }}>
              {`${dict.months[new Date(item).getMonth()]} ${item.slice(0, 4)}`}
            </Title>
            <Divider/>
          </>
        ) : (
          <CalendarListSection entries={item}/>
        )
      }
    >
    </FlatList>
  );
}
