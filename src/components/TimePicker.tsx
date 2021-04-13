import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import Storage from 'storage';

export const TimePicker = (props: any) => {
  const [settings, modifySettings] = Storage.useSettings();

  const now = new Date();

  const getFormatedTime = (date: Date): string => {
    return Intl.DateTimeFormat(settings.language, { timeStyle: 'short' }).format(date);
  };


  const currentTime = getFormatedTime(now);

  const [fromTime, setFromTime] = useState(currentTime);
  const [toTime, settoTime] = useState(currentTime);

  let timeSteps = [];

  const stepSize = 60 / props.steps;
  const count = 24 * props.steps;

  for (let i = 0; i < count; ++i) {
    let minutes = i * stepSize;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    const date = new Date(now.getFullYear(), now.getMonth(), now.getDay(), hours, minutes);

    const timeString = getFormatedTime(date);

    timeSteps.push(
      <Picker.Item label={timeString} value={timeString} key={'tp_' + i} />
    );
  }

  return (
    <View>
      <Picker>
        {timeSteps}
      </Picker>
    </View>
  );
};
