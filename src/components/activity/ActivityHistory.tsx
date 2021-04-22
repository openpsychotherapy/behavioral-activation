import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Storage from 'storage';

export const ActivityHistory = () => {
  const [activities, modifyActivities] = Storage.useActivities();

  console.log(activities);

  let historyItems: any = [];

  activities.forEach(activity => {
    historyItems.push(
      <Text>{activity.date}</Text>
    );
  });
  
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {historyItems}
    </View>
  );
};
