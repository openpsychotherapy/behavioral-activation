import React from 'react';

import { CalendarEntry } from 'storage/types';
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
    navigation.navigate("RegisterPlanningRate")
  }
    
  return <CalendarList calendar={calendar} onEntryClick={onEntryClick} />;
}
