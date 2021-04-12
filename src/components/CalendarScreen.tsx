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
import { CalendarList } from './calendar/CalendarList';

import Storage from '../storage';

const CalendarStack = createStackNavigator();

const ViewContent = () => {
  const [calendar, modifyCalendar] = Storage.useCalendar();

  const addEntry = () => {
      modifyCalendar.add({
          date: "2021-03-12",
          start: "19:00",
          end: "20:00",
          text: "Hello - The afterparty 7",
          icon: "run",
          person: "Erik",
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarList calendar={calendar}/>
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
