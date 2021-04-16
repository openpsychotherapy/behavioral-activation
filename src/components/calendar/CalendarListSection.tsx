import React from 'react';

import { Calendar, CalendarEntry } from 'storage/calendar';
import { CalendarListItem } from './CalendarListItem';
import { List, useTheme } from 'react-native-paper';
import { useTranslation } from 'language/LanguageProvider';

export const CalendarListSection: React.FC<{entries: Calendar}> = ({ entries }) => {
  const dict = useTranslation();
  const weekday = dict.weekdays[new Date(entries[0].date).getDay()];
  const { title, calendar: calStyle } = useTheme();
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
      <CalendarListItem key={i} entry={entry} index={i} />)}
    </List.Section>
  );
}
