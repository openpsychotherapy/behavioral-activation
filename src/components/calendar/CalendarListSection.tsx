import React from 'react';

import { Calendar, CalendarEntry } from 'storage/calendar';
import { CalendarListItem } from './CalendarListItem';
import { List } from 'react-native-paper';

export const CalendarListSection: React.FC<{entries: Calendar}> = ({ entries }) => {
  return (
    <List.Section>
      <List.Subheader style={{ fontSize: 30, paddingBottom: 0 }}>Fre</List.Subheader>
      {entries.map((entry: CalendarEntry, i: number) => <CalendarListItem key={i} entry={entry} index={i}/>)}
    </List.Section>
  );
}
