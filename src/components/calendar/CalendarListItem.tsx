import React from 'react';

import { CalendarEntry } from 'storage/calendar';

import { List, Surface, Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';

export const CalendarListItem: React.FC<{entry: CalendarEntry, index: number}> = ({ entry, index }) => {
  const { title, calendar: calStyle } = useTheme();
  return (
    <View style={{ flexDirection: "row", width: "100%", marginBottom: 10 }}>
      <View style={{ justifyContent: 'center' }}>
        <Surface
          style={{
            width: calStyle.dateViewSize,
            height: calStyle.dateViewSize,
            marginHorizontal: calStyle.dateViewMargin,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            opacity: index === 0 ? 1 : 0,
          }}
        >
          <Text style={title}>
            {new Date(entry.date).getDate()}
          </Text>
        </Surface>
      </View>
      <Surface style={{ flex: 1, flexGrow: 1, borderRadius: 5, marginRight: 10 }}>
        <List.Item
          title={`${entry.start} - ${entry.end}`}
          description={entry.text}
          right={() => <List.Icon icon={entry.icon} />}
        />
      </Surface>
    </View>
  );
}
