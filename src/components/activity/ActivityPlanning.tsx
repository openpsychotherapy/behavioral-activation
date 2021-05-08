import React from 'react';

import { CalendarEntry } from 'storage/types';
import Storage from 'storage';
import { CalendarList } from '../calendar/CalendarList';
import { ISODate, ISOTime } from 'utils';


export const ActivityPlanning = ({ navigation }: any) => {

  const [calendar, modifyCalendar] = Storage.useCalendar();

  const onEntryClick = (entry: CalendarEntry) => {
    navigation.navigate("RegisterPlanningRate", { entry })
  }

  const today = ISODate(new Date());
  const time = ISOTime(new Date());

  const calendarFilter = (e: CalendarEntry): boolean => {
    return !e.isRegistered && (e.date < today || (e.date == today && e.start <= time))
  }
    
  return (
    <CalendarList
      calendar={calendar.filter(calendarFilter)}
      onEntryClick={onEntryClick}
    />
  );
}
