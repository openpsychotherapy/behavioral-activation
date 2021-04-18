import React, { ReactText } from 'react';
import { View } from 'react-native';
import { List, Subheading } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import Storage from 'storage';
import { useTranslation } from 'language/LanguageProvider';

// Converts hours and minutes into date based on current date.
const getOffsetDate = (date: Date, hours: number, minutes: number) : Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), hours, minutes);
};

/**
   * Returns the current date and time with a give offset rouded down to the closest step match.
   *
   * @example
   * ```
   * // Current time and date is: 2021-04-19 - 14.25
   * const timeRounded = getCurrentTimeRounded(1, 4);
   * // timeRounded should now equal to: Date(2021, 04, 19, 15, 15)
   * 
   * ```
   * 
   * @param offset - Offset in hours
   * @param steps - Number of steps per hour
   * @returns A date object containing rounded time
   *
   */
export const getCurrentTimeRounded = (offset: number, steps: number): Date => {
  const now = new Date();
  const stepSize = 60 / steps;

  // Rounds current time to the closes multiple of stepSize 
  let currentMinutes = Math.floor((now.getHours() * 60 + now.getMinutes()) / stepSize) * stepSize;
  
  // Calculate the hours / minutes from total minutes
  const currentHours = Math.floor(currentMinutes / 60);
  currentMinutes = currentMinutes % 60;

 return getOffsetDate(now, currentHours+offset, currentMinutes);
}

export const TimePicker = (props: { now: Date, defaultTimeOffset: number, steps: number, 
  fromTime: Date, setFromTime: React.Dispatch<React.SetStateAction<Date>>,
  toTime: Date, setToTime: React.Dispatch<React.SetStateAction<Date>>}) => {
  
  const [settings, modifySettings] = Storage.useSettings();
  const lang = useTranslation();


  // Formats a date into a locale time string.
  const getFormattedTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric', minute: 'numeric'
    };
    return Intl.DateTimeFormat(settings.language, options).format(date);
  };

  // JSX Picker.Item components
  let timeSteps = [];
  let timeStepDates : {[key: string]: Date} = {};

  // props.steps is number of steps per hour
  const count = 24 * props.steps + 1;
  const stepSize = 60 / props.steps;
  
  // Divide the time depending on stepsize (props.steps)
  for (let i = 0; i < count; ++i) {
    let minutes = i * stepSize;
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    const stepDate = getOffsetDate(props.now,hours, minutes);
    const timeString = getFormattedTime(stepDate);
    
    timeStepDates[i] = stepDate;
    timeSteps.push(
      <Picker.Item label={timeString} value={timeString} key={'tp_' + i} />
    );
  }

  const onValueChangeFrom = (itemIndex: number) => {
    const fromDate = timeStepDates[itemIndex]; // index: 0 - 24
    props.setFromTime(fromDate);
    
    if (fromDate >= props.toTime) {
      let newToDate = new Date(fromDate);
      newToDate.setMinutes(newToDate.getMinutes() + props.defaultTimeOffset);
      props.setToTime(newToDate);
    }
  }

  const onValueChangeTo = (itemIndex: number) => {
    const toDate = timeStepDates[itemIndex+1]; // index: 1 - 25
    props.setToTime(toDate);

    if (toDate <= props.fromTime) {
      let newFromDate = new Date(toDate);
      newFromDate.setMinutes(newFromDate.getMinutes() - props.defaultTimeOffset);
      props.setFromTime(newFromDate);
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
      <Subheading>{lang.timePickerLabel}</Subheading>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Picker style={{flex: 1, flexGrow: 1}}
          selectedValue={getFormattedTime(props.fromTime)}
          mode='dropdown'
          onValueChange={(itemValue: ReactText, itemIndex: number) => onValueChangeFrom(itemIndex)}
          >
          { timeSteps.slice(0, count-1) }
        </Picker>
        <List.Icon icon='clock' style={{margin: 0}} />

        <Picker style={{flex: 1, flexGrow: 1}}
          selectedValue={getFormattedTime(props.toTime)}
          mode='dropdown'
          onValueChange={(itemValue: ReactText, itemIndex: number) => onValueChangeTo(itemIndex)}
          >
          { timeSteps.slice(1) }
        </Picker>
        <List.Icon icon='clock' style={{margin: 0}} />
      </View>
    </View>
  );
};
