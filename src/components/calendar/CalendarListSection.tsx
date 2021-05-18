import React from 'react';

import { Calendar, CalendarEntry } from 'storage/types';
import { CalendarListItem } from './CalendarListItem';
import { List, useTheme } from 'react-native-paper';
import Storage from 'storage';

interface Props {
  entries: Calendar;
  onEntryClick: (entry: CalendarEntry) => void;
  onLongPress?: (entry: CalendarEntry) => void;
}

export const CalendarListSection = ({ entries, onEntryClick, onLongPress }: Props) => {
  const [settings, modifySettings] = Storage.useSettings();
  const { title, calendar: calStyle } = useTheme();
  const formatter = Intl.DateTimeFormat(settings.language, { weekday: 'short' });
  const weekday = formatter.format(new Date(entries[0].date));
  return (
    <List.Section>
      <List.Subheader
        style={{
          ...title,
          paddingVertical: 0,
          width: calStyle.dateViewSize + 2*calStyle.dateViewMargin,
          textAlign: 'center',
        }}
      >
        {weekday}
      </List.Subheader>
      {entries.map((entry: CalendarEntry, i: number) =>
      <CalendarListItem 
        key={i}
        entry={entry} 
        index={i} 
        onEntryClick={onEntryClick} 
        onLongPress ={() => (onLongPress ?? (e => {}))(entry)}/>)}
    </List.Section>
  );
}
