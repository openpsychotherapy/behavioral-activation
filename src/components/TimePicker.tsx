import React, { ReactText } from 'react';
import { View } from 'react-native';
import { List, Subheading } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import Storage from 'storage';
import { useTranslation } from 'language/LanguageProvider';

// Converts hours and minutes into date based on current date.
const getOffsetDate = (date: Date, hours: number, minutes: number) : Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), hours, minutes);
};

/**
 * Returns the current date and time with a give offset rounded down to the closest step match.
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
 * @returns A date object containing the rounded time
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

/**
 * A time picker component with dynamic step size.
 *
 * @example
 * ```
 * const steps = 1;
 * const [fromTime, setFromTime] = React.useState(getCurrentTimeRounded(0, steps));
 * const [toTime, setToTime] = React.useState(getCurrentTimeRounded(1, steps));
 *
 * return (
 *  <TimePicker now={new Date()} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime}
 *     toTime={toTime} setToTime={setToTime} />
 * );
 *
 * ```
 *
 * @param now - The date and time right now as a Date object
 * @param defaultTimeOffset - The default length, in minutes, of an interval if a overlap occures
 * @param steps - Number of steps per hour
 * @param fromTime - Start time value as a Date object (eg a hook)
 * @param setFromTime - Start time set function (eg a hook)
 * @param toTime - End time value as a Date object (eg a hook)
 * @param setToTime -End time set function (eg a hook)
 *
 * @returns The TimePicker component
 *
 */
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
  let timeSteps: any[] = [];
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
      {label: timeString, value: timeString}
    );
  }

  const onValueChangeFrom = (itemIndex: number) => {
    const fromDate = timeStepDates[itemIndex]; // index: 0 - 24
    props.setFromTime(fromDate);

    // If overlap occurs, calculate the opposite sides new value
    if (fromDate >= props.toTime) {
      let newToDate = new Date(fromDate);
      newToDate.setMinutes(newToDate.getMinutes() + props.defaultTimeOffset);
      props.setToTime(newToDate);
    }
  };

  const onValueChangeTo = (index: number) => {
    const toDate = timeStepDates[index+1]; // index: 1 - 25
    props.setToTime(toDate);

    // If overlap occurs, calculate the opposite sides new value
    if (toDate <= props.fromTime) {
      let newFromDate = new Date(toDate);
      newFromDate.setMinutes(newFromDate.getMinutes() - props.defaultTimeOffset);
      props.setFromTime(newFromDate);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
      <Subheading>{lang.timePickerLabel}</Subheading>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <DropDownPicker containerStyle ={{flex: 1, flexGrow: 1}}
          defaultValue={getFormattedTime(props.fromTime)}
          items={timeSteps.slice(0, count-1)}
          onChangeItem={(item: any, index: number) => onValueChangeFrom(index)}
          itemStyle={{ justifyContent: 'space-evenly' }}
          autoScrollToDefaultValue={true}
          />
        <List.Icon icon='clock' style={{margin: 0}} />

        <DropDownPicker containerStyle={{flex: 1, flexGrow: 1}}
          items={timeSteps.slice(1)}
          defaultValue={getFormattedTime(props.toTime)}
          onChangeItem={(item: any, index: number) => onValueChangeTo(index)}
          itemStyle={{ justifyContent: 'space-evenly' }}
          autoScrollToDefaultValue={true}
          />
        <List.Icon icon='clock' style={{margin: 0}} />
      </View>
    </View>
  );
};
