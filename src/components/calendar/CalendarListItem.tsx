import React from 'react';

import { CalendarEntry } from 'storage/calendar';

import { List, Surface, Text } from 'react-native-paper';
import { View } from 'react-native';

export const CalendarListItem: React.FC<{entry: CalendarEntry, index: number}> = ({ entry, index }) => {
  return (
    <View style={{flexDirection: "row", width: "100%", marginBottom: 10 }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Surface
          style={{
            width: 60,
            height: 60,
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            opacity: index == 0 ? 1 : 0,
          }}
        >
          <Text style={{ fontSize: 28 }}>
            {new Date(entry.date).getDate()}
          </Text>
        </Surface>
      </View>
      <Surface style={{ width: "78%", borderRadius: 5 }}>
        <List.Item
          title={`${entry.start} - ${entry.end}`}
          description={entry.text}
          right={() => <List.Icon icon={entry.icon} />}
        />
      </Surface>
    </View>
  );
}
