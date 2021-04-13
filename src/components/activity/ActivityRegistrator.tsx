import React from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, useTheme } from 'react-native-paper';

import { DatePicker } from './../DatePicker';

import { TimePicker } from './../TimePicker';

export const ActivityRegistrator = ({ route, navigation }: any) => {
  // route.params contains information from activity screen 

  const { iconSizes } = useTheme();

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        {/*<Avatar.Icon icon={route.params.icon} size={iconSizes.avatar} />*/}
        {/*<DatePicker />*/}
        <TimePicker steps={1} />
      </View>
    </View>
  );
};
