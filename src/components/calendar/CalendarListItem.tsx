import React from 'react';

import { CalendarEntry } from 'storage/calendar';

import { List, Surface, Text } from 'react-native-paper';

export const CalendarListItem: React.FC<{entry: CalendarEntry, index: number}> = ({ entry, index }) => {
  return (
    <List.Item
      title=""
      left={() => (
          <Surface
            style={{
              width: 60,
              height: 60,
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
        )
      }
      right={() => (
          <Surface>
            <List.Item
              title={`${entry.start} - ${entry.end}`}
              description={entry.text}
              right={() => <List.Icon icon={entry.icon} />}
            />
          </Surface>
        )
      }
    />
  );
}
