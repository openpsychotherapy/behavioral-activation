import { useTranslation } from 'language/LanguageProvider';
import React, { useEffect, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import { Divider, Title, useTheme } from 'react-native-paper';

import { entryGtEq } from 'storage/calendar';
import { Calendar, CalendarEntry } from 'storage/types';
import { ISODate } from 'utils';
import { CalendarListSection } from './CalendarListSection';
import Storage from 'storage';

/**
 * Returns a new calendar grouped by date.
 *
 * @remarks
 * This function assumes the calendar is sorted.
 *
 * @param calendar - The calendar to group by date (day)
 * @returns A list of calendars where each calendar is a day of entries
 */
const groupByDate = (calendar: Calendar): Calendar[] => {
  let groups: Calendar[] = [];
  let currentGroup: Calendar = [];
  let date = '';

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

/**
 * Inserts headers of the form YYYY-mm before calendars that has the
 * header as year and month.
 *
 * @remarks
 * This function assumes the calendar is sorted.
 *
 * @param groups - The list of calendars to insert headers into
 * @returns A list containing calendars and strings (headers)
 */
const insertMonthHeaders = (groups: Calendar[]): (Calendar | string)[] => {
  let groupsWithHeaders: (Calendar | string)[] = [];
  let currentMonth = '';

  groups.forEach(group => {
    const month = group[0].date.slice(0, 7); // YYYY-mm
    if (month !== currentMonth) {
      groupsWithHeaders.push(month);
    }
    groupsWithHeaders.push(group);
    currentMonth = month;
  });

  return groupsWithHeaders;
}

type ListState = { groups: Calendar[], entryCount: number };

interface Props {
  calendar: Calendar;
  onEntryClick: (entry: CalendarEntry) => void;
  onLongPress?: (entry: CalendarEntry) => void;
}

export const CalendarList = ({ calendar, onEntryClick, onLongPress }: Props) => {
  const [listState, setListState] = useState<ListState>({groups: [], entryCount: 0});
  const [settings, modifySettings] = Storage.useSettings();
  const { title } = useTheme();
  const lang = useTranslation();

  useEffect(() => {
    // Load upcoming calendar entries when initializing
    const today = ISODate(new Date());
    const upcomingEntries = calendar.filter(entry => {
      return entryGtEq(entry, {...entry, date: today, start: '00:00'})
    });
    setListState({
      groups: groupByDate(upcomingEntries),
      entryCount: upcomingEntries.length,
    });
  }, [calendar]);

  /**
   * Loads previous events during a refresh.
   */
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
        style={{ width: '100%' }}
        data={insertMonthHeaders(listState.groups)}
        refreshing={false}
        onRefresh={onRefresh}
        keyExtractor={(item) => JSON.stringify(item)}
        renderItem={({item}) =>
          typeof(item) === 'string' ? (
            <>
              <Divider style={{ height: 2 }}/>
              <Title style={{ ...title, textAlign: 'center', marginVertical: 10 }}>
                {Intl.DateTimeFormat(settings.language, { year: 'numeric', month: 'long' })
                  .format(new Date(item))}
              </Title>
              <Divider style={{ height: 2 }}/>
            </>
          ) : (
            <CalendarListSection 
              entries={item} 
              onEntryClick={onEntryClick} 
              onLongPress={onLongPress}
            />
          )
        }
        contentContainerStyle={listState.groups.length == 0 ? {flexGrow: 1} : {}}
        ListEmptyComponent={() =>
          <View style={{flex: 1, height: '100%', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>
              {lang.calendarNoItem}
            </Text>
          </View>
        }
      >
      </FlatList>
  );
}
