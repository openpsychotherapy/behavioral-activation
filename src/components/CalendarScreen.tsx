import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { CalendarList } from './calendar/CalendarList';

import Storage from 'storage';
import { SettingsScreen } from './SettingsScreen';

const CalendarStack = createStackNavigator();

const CalendarFAB = () =>  {
  const [calendar, modifyCalendar] = Storage.useCalendar();

  const addEntry = () => {
    modifyCalendar.add({
        date: "2022-04-10",
        start: "12:00",
        end: "13:00",
        text: "Hello",
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
      <CalendarFAB />
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
      <CalendarStack.Screen name="Settings" component={SettingsScreen} />
    </CalendarStack.Navigator>
  );
}
