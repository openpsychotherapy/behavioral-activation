import React from 'react';

import { CalendarListItem } from './CalendarListItem';
import { List } from 'react-native-paper';

export const CalendarListSection = ({ entries }) => {
  return (
    <List.Section>
      <List.Subheader style={{ fontSize: 30, paddingBottom: 0 }}>Fre</List.Subheader>
      {entries.map((entry, i) => <CalendarListItem key={i} entry={entry} index={i}/>)}
    </List.Section>
  );
}
