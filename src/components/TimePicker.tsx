import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, List, Avatar} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import Storage from 'storage';

export const TimePicker = (props: any) => {
  const [settings, modifySettings] = Storage.useSettings();

  // Things that should be props
  const now = new Date();
  const defaultTimeDifference = 60; // Minutes


  // Formats a date into a locale time string.
  const getFormatedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
  };

  // Converts hours and minutes into date based on current date.
  const getOffsetDate = (hours: number, minutes: number) : Date => {
    return new Date(now.getFullYear(), now.getMonth(), now.getDay(), hours, minutes);
  };

  // JSX Picker.Item components
  let timeSteps = [];
  let timeStepDates : {[key: string]: Date} = {};

  // props.steps is number of steps per hour
  const count = 24 * props.steps;
  const stepSize = 60 / props.steps;
  
  // Divide the time depending on stepsize (props.steps)
  for (let i = 0; i < count; ++i) {
    let minutes = i * stepSize;
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    const stepDate = getOffsetDate(hours, minutes);
    const timeString = getFormatedTime(stepDate);
    
    timeStepDates[timeString] = stepDate;
    timeSteps.push(
      <Picker.Item label={timeString} value={timeString} key={'tp_' + i} />
    );
  }

  // Rounds current time to the closes multiple of stepSize 
  let currentMinutes = Math.floor((now.getHours() * 60 + now.getMinutes()) / stepSize) * stepSize;
  
  // Calculate the hours / minutes from total minutes
  const currentHours = Math.floor(currentMinutes/60);
  currentMinutes = currentMinutes % 60;

  const startTime = getOffsetDate(currentHours, currentMinutes);
  const endTime = getOffsetDate(currentHours+1, currentMinutes);

  const startTimeFormatted = getFormatedTime(startTime);
  const endTimeFormatted = getFormatedTime(endTime);
  

  // Store the state of the pickers
  const [fromTime, setFromTime] = useState(startTimeFormatted);
  const [toTime, setToTime] = useState(endTimeFormatted);

  const onValueChangeFrom = (itemValue: string) => {
    setFromTime(itemValue);
    const fromDate = timeStepDates[itemValue];
    const toDate = timeStepDates[toTime];

    if(fromDate >= toDate) {
      let newToDate = fromDate;
      newToDate.setMinutes(newToDate.getMinutes() + defaultTimeDifference);
      setToTime(getFormatedTime(newToDate))
    }
  }

  const onValueChangeTo = (itemValue: string) => {
    setToTime(itemValue);
    const toDate = timeStepDates[itemValue];
    const fromDate = timeStepDates[fromTime];

    if(toDate <= fromDate) {
      let newFromDate = toDate;
      newFromDate.setMinutes(newFromDate.getMinutes() - defaultTimeDifference);
      setFromTime(getFormatedTime(newFromDate))
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Picker style={{flex: 1, flexGrow: 1}}
        selectedValue={fromTime}
        mode='dropdown'
        onValueChange={(itemValue: string, itemIndex: number) => onValueChangeFrom(itemValue)}
        >
        { timeSteps }
      </Picker>
      <List.Icon icon='clock' style={{margin: 0}} />
      <Picker style={{flex: 1, flexGrow: 1}}
        selectedValue={toTime}
        mode='dropdown'
        onValueChange={(itemValue: string, itemIndex: number) => onValueChangeTo(itemValue)}
        >
        { timeSteps }
      </Picker>
      <List.Icon icon='clock' style={{margin: 0}} />
    </View>
  );
};
