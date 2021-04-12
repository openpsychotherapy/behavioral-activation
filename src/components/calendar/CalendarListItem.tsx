import React from 'react';

import { List, Surface, Text } from 'react-native-paper';


export const CalendarListItem = ({ entry, index }) => {
  return (
    <List.Item
      left={() => (
          <Surface
            style={{
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100%',
              visibility: index == 0 ? 'visible' : 'hidden',
            }}
          >
            <Text style={{ fontSize: 28 }}>
              21
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
