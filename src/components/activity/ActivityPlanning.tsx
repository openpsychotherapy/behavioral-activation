import { useTranslation } from 'language/LanguageProvider';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Surface, List, Caption, Title, useTheme } from 'react-native-paper';

import { entryGt } from 'storage/calendar';
import { Calendar, CalendarEntry } from 'storage/types';
import { ISODate } from 'utils';
import { CalendarListSection } from '.././calendar/CalendarListSection';
import Storage from 'storage';
import { CalendarList } from '../calendar/CalendarList';


export const ActivityPlanning = ({ navigation }: any) => {

  let planningItem = [];

  const [calendar, modifyCalendar] = Storage.useCalendar();

  // Apply segment
  //const fromDate = 
  //const toDate = 
  //const fromTimeString =
  //const toTimeString = 
  //const icon = 
  //const text = 

  //planningItem.push(
  //  <Surface key={'hi_' + fromDate.toString()} style={{ flexDirection: 'row', borderRadius: 5, elevation: 5, marginHorizontal: 10 , marginVertical: 5 }}>
  //    <List.Item style={{flex: 1, flexGrow: 1 }} title={fromTimeString + ' - ' + toTimeString} description={activity.text} right={() =>
  //      <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //        <List.Icon icon={icon}/>
  //      </View>
  //    }/>
  //  </Surface>
  //  );

  const onEntryClick = (entry: CalendarEntry) => {
    navigation.navigate("rateActivity")
  }
    
  return <CalendarList calendar={calendar} onEntryClick={(entry: CalendarEntry) => {console.log(entry)}} />;
}
