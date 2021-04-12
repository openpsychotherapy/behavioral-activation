import React from 'react';
import { FlatList } from 'react-native';

import { CalendarListSection } from './CalendarListSection';

export const CalendarList = ({ calendar }) => {
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
