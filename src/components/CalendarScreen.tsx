import React from 'react';
import { View } from 'react-native';
import {
  Button,
  IconButton,
  List,
  Surface,
  Text,
} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

import Storage from '../storage';

const CalendarStack = createStackNavigator();

const CalendarListItem = ({ entry, index }) => {
  return (
    <List.Item
      left={() => (
          <Surface
            style={{
              width: 60,
              height: 60,
              fontSize: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100%',
              visibility: index == 0 ? 'visible' : 'hidden',
            }}
          >
            21
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

const CalendarListSection = ({ entries }) => {
  return (
    <List.Section>
      <List.Subheader style={{ fontSize: 30, paddingBottom: 0 }}>Fre</List.Subheader>
      {entries.map((entry, i) => <CalendarListItem key={i} entry={entry} index={i}/>)}
    </List.Section>
  );
}

const ViewContent = () => {
  const [calendar, modifyCalendar] = Storage.useCalendar();

  const addEntry = () => {
      modifyCalendar.add({
          date: "2021-03-12",
          start: "19:00",
          end: "20:00",
          text: "Hello - The afterparty 4",
          icon: "run",
          person: "Erik",
      });
  }

  //<Button onPress={addEntry}>Entry</Button>
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarListSection entries={calendar}/>
    </View>
  );
}

export const CalendarScreen = () => {
  return (
    <CalendarStack.Navigator initialRouteName="Calendar" headerMode="float"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <CalendarStack.Screen name="Calendar" component={ViewContent} />
    </CalendarStack.Navigator>
  );
}
