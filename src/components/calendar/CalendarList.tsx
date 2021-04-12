import React from 'react';
import { FlatList } from 'react-native';

import { Calendar } from 'storage/calendar';
import { CalendarListSection } from './CalendarListSection';

export const CalendarList: React.FC<{calendar: Calendar}> = ({ calendar }) => {
  return (
    <FlatList
      data={[calendar]}
      renderItem={({item, index, separators}) => {
        return (
        <CalendarListSection entries={item}/>
      )}}
    >
    </FlatList>
  );
}
