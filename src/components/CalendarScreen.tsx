import React from 'react';
import { View } from 'react-native';
import {
  Button,
  IconButton,
  List,
  Surface,
  Text,
  FAB
} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { CalendarList } from './calendar/CalendarList';

import Storage from 'storage';

const CalendarStack = createStackNavigator();

const AddEventButton = () =>  {
  const [calendar, modifyCalendar] = Storage.useCalendar();
  const [settings, modifySettings] = Storage.useSettings();

  const addEntry = () => {
    modifySettings.setLanguage('sv');
    modifyCalendar.add({
        date: "2022-05-15",
        start: "00:00",
        end: "02:00",
        text: "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text ",
        icon: "run",
        person: "Erik",
    });
  }

  return (
  <FAB
    style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    }}
    icon="plus"
    onPress={addEntry}
  />
  );
}


const ViewContent = () => {
  const [calendar, modifyCalendar] = Storage.useCalendar();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarList calendar={calendar}/>
      <AddEventButton />
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
