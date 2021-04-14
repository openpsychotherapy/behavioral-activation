import React from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, useTheme } from 'react-native-paper';

import { DatePicker } from './../DatePicker';

import { TimePicker, getCurrentTimeRounded } from './../TimePicker';

export const ActivityRegistrator = ({ route, navigation }: any) => {
  // route.params contains information from activity screen 

  const { iconSizes } = useTheme();
  const steps = 1;

  const [fromTime, setFromTime] = React.useState(getCurrentTimeRounded(0, steps));
  const [toTime, setToTime] = React.useState(getCurrentTimeRounded(1, steps));

  const [date, setDate] = React.useState<Date>(new Date());


  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <Avatar.Icon icon={route.params.icon} size={iconSizes.avatar} />
        <DatePicker date={date} setDate={setDate} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TimePicker now={new Date()} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime} toTime={toTime} setToTime={setToTime} />
      </View>
      <Text>{fromTime.toString()} - {toTime.toString()}</Text>
      <Text>{date.toString()}</Text>
    </View>
  );
};
