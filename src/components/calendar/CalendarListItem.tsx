import React from 'react';

import { CalendarEntry } from 'storage/types';

import { List, Surface, Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import Storage from 'storage';
import { useNavigation } from '@react-navigation/native';

/**
 * Converts an ISO-time to a localized time string
 *
 * @param language - The language to localize in
 * @param time - The ISO time to localize
 * @returns A localized time string
 */
const localizeTime = (language: string, time: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric', minute: 'numeric'
  };
  const [hour, minute] = time.split(':').map(n => parseInt(n));
  return Intl.DateTimeFormat(language, options).format(new Date(1970, 1, 1, hour, minute));
}

export const CalendarListItem: React.FC<{entry: CalendarEntry, index: number}> = ({ entry, index }) => {
  const { title, calendar: calStyle } = useTheme();
  const [settings, modifySettings] = Storage.useSettings();
  const navigation = useNavigation();
  const start = localizeTime(settings.language, entry.start);
  const end = localizeTime(settings.language, entry.end);
  return (
    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
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
          title={`${start} - ${end}`}
          description={entry.text}
          right={() => <List.Icon icon={entry.icon} />}
          onPress={() => {
            navigation.navigate('CalendarRegistration', {
              entry,
              pressedIcon: index,
              icon: entry.icon
            });
          }}
        />
      </Surface>
    </View>
  );
}
