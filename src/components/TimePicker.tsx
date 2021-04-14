import React, { useState } from 'react';
import { View } from 'react-native';
import { List,} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import Storage from 'storage';

// Converts hours and minutes into date based on current date.
const getOffsetDate = (date: Date, hours: number, minutes: number) : Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), hours, minutes);
};

export const getCurrentTimeRounded = (offset: number, steps: number): Date => {
  const now = new Date();
  const stepSize = 60 / steps;

  // Rounds current time to the closes multiple of stepSize 
  let currentMinutes = Math.floor((now.getHours() * 60 + now.getMinutes()) / stepSize) * stepSize;
  
  // Calculate the hours / minutes from total minutes
  const currentHours = Math.floor(currentMinutes/60);
  currentMinutes = currentMinutes % 60;

 return getOffsetDate(now, currentHours+offset, currentMinutes);

}

export const TimePicker = (props: { now: Date, defaultTimeOffset: number, steps: number, 
    fromTime: Date, setFromTime: React.Dispatch<React.SetStateAction<Date>>, toTime: Date, setToTime: React.Dispatch<React.SetStateAction<Date>>}) => {
  const [settings, modifySettings] = Storage.useSettings();


  // Formats a date into a locale time string.
  const getFormatedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
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

    const stepDate = getOffsetDate(props.now,hours, minutes);
    const timeString = getFormatedTime(stepDate);
    
    timeStepDates[timeString] = stepDate;
    timeSteps.push(
      <Picker.Item label={timeString} value={timeString} key={'tp_' + i} />
    );
  }

  const onValueChangeFrom = (itemValue: string) => {
    const fromDate = timeStepDates[itemValue];
    props.setFromTime(fromDate);
    
    if(fromDate >= props.toTime) {
      let newToDate = new Date(fromDate);
      newToDate.setMinutes(newToDate.getMinutes() + props.defaultTimeOffset);
      props.setToTime(newToDate);
    }
  }

  const onValueChangeTo = (itemValue: string) => {
    const toDate = timeStepDates[itemValue];
    props.setToTime(toDate);

    if(toDate <= props.fromTime) {
      let newFromDate = new Date(toDate);
      newFromDate.setMinutes(newFromDate.getMinutes() - props.defaultTimeOffset);
      props.setFromTime(newFromDate);
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Picker style={{flex: 1, flexGrow: 1}}
        selectedValue={getFormatedTime(props.fromTime)}
        mode='dropdown'
        onValueChange={(itemValue: string, itemIndex: number) => onValueChangeFrom(itemValue)}
        >
        { timeSteps }
      </Picker>
      <List.Icon icon='clock' style={{margin: 0}} />
      <Picker style={{flex: 1, flexGrow: 1}}
        selectedValue={getFormatedTime(props.toTime)}
        mode='dropdown'
        onValueChange={(itemValue: string, itemIndex: number) => onValueChangeTo(itemValue)}
        >
        { timeSteps }
      </Picker>
      <List.Icon icon='clock' style={{margin: 0}} />
    </View>
  );
};
