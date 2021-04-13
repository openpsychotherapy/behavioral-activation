import React from 'react';

import { Calendar, CalendarEntry } from 'storage/calendar';
import { CalendarListItem } from './CalendarListItem';
import { List } from 'react-native-paper';
import { useTranslation } from 'language/LanguageProvider';

export const CalendarListSection: React.FC<{entries: Calendar}> = ({ entries }) => {
  const dict = useTranslation();
  const weekday = dict.weekdays[new Date(entries[0].date).getDay()];
  return (
    <List.Section>
      <List.Subheader style={{ fontSize: 30, paddingVertical: 0 }}>{weekday}</List.Subheader>
      {entries.map((entry: CalendarEntry, i: number) =>
      <CalendarListItem key={i} entry={entry} index={i} />)}
    </List.Section>
  );
}
