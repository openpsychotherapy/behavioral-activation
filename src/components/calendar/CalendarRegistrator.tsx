import React from 'react';
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import { IconButton, Avatar, useTheme } from 'react-native-paper';

import { DatePicker } from '../DatePicker';
import { TimePicker, getCurrentTimeRounded } from '../TimePicker';
import { ChoiceBasedTextInput } from '../ChoiceBasedTextInput';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { CalendarEntry } from 'storage/types';
import { RouteProp } from '@react-navigation/core';
import { CalendarStackParamList } from '../CalendarScreen';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Returns the date in ISO format. Normal programming languages use
 * something like date.strftime("%Y-%m-%d").
 *
 * @returns A ISO-formatted date
 */
const ISODate = (date: Date): string => {
  const year = date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

const ISOTime = (date: Date): string => {
  let hour = '' + date.getHours();
  let minute = '' + date.getMinutes();

  if (hour.length < 2) {
    hour = '0' + hour;
  }
  if (minute.length < 2) {
    minute = '0' + minute;
  }

  return hour + ':' + minute;
}

type CalendarRegistratorRouteProp = RouteProp<
  CalendarStackParamList,
  'CalendarRegistration'
>;

type CalendarRegistratorNavigationProp = StackNavigationProp<
  CalendarStackParamList,
  'CalendarRegistration'
>;

type Props = {
  route: CalendarRegistratorRouteProp,
  navigation: CalendarRegistratorNavigationProp,
};

export const CalendarRegistrator = ({ route, navigation }: Props) => {
  const lang = useTranslation();
  const { iconSizes, colors } = useTheme();

  const steps = 2;
  const defaultChoice = {
    value: lang.activityRegistratorActivityDefaultChoice,
    isDefault: true
  }
  let choices = [ defaultChoice ];

  let activityTextDefault = '';
  let dateDefault = new Date();
  let fromTimeDefault = getCurrentTimeRounded(0, steps);
  let toTimeDefault = getCurrentTimeRounded(1, steps);

  // Overwrite default values from entry
  if (route.params?.entry) {
    const entry = route.params?.entry;
    activityTextDefault = entry.text;
    dateDefault = new Date(entry.date);
    const [fromHour, fromMinute] = entry.start.split(':').map(n => parseInt(n))
    const [toHour, toMinute] = entry.end.split(':').map(n => parseInt(n))
    fromTimeDefault = new Date(
      dateDefault.getFullYear(),
      dateDefault.getMonth(),
      dateDefault.getDate(),
      fromHour,
      fromMinute
    );
    toTimeDefault = new Date(
      dateDefault.getFullYear(),
      dateDefault.getMonth(),
      dateDefault.getDate(),
      toHour,
      toMinute
    );
  }

  const [values, modifyValues] = Storage.useValues();
  const [calendar, modifyCalendar] = Storage.useCalendar();
  
  const [fromTime, setFromTime] = React.useState(fromTimeDefault);
  const [toTime, setToTime] = React.useState(toTimeDefault);
  
  const [date, setDate] = React.useState(dateDefault);
  
  const [choice, setChoice] = React.useState(defaultChoice);
  const [activityText, setActivityText] = React.useState(activityTextDefault);


  // Find topics to choose from depending on input icon
  const addTopicEntries = (topics: any) => {
    for (let topicIndex = 0; topicIndex < topics.length; ++topicIndex) {
      for (let entryIndex = 0; entryIndex < topics[topicIndex].entries.length; ++entryIndex){
        const entry = topics[topicIndex].entries[entryIndex];

        // If icons match, include it in choices
        if (entry.icon == route.params.icon) {
          choices.push({
            value: entry.text,
            isDefault: false
          });
        }
      }
    }
  };

  // Go through all categories in values
  addTopicEntries(values.responsibilities);
  addTopicEntries(values.relations);
  addTopicEntries(values.enjoyment);
  addTopicEntries(values.health);
  addTopicEntries(values.work);


  const onConfirm = () => {
    // Check if custom text has been entered
    const entryText = choice.isDefault ? activityText : choice.value;

    const isoDateString = ISODate(date);

    // Create entry from information entered by user
    const entry: CalendarEntry = {
      text: entryText,
      icon: route.params.icon,
      person: '', // TODO: link to value based on choice
      date: isoDateString,
      start: ISOTime(fromTime),
      end: ISOTime(toTime),
    };

    if (route.params?.entry) {
      modifyCalendar.replace(route.params.entry, entry);
    } else {
      modifyCalendar.add(entry);
    }

    // Go back
    navigation.navigate('Calendar', {activityRegistered: true})
  };


  const onCancel = () => {
    // Go back
    navigation.navigate('Calendar', {activityRegistered: false})
  };

  // Attempts to dissmiss the keyboard when the 
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  /**
   * This hook/function saves the auto-scaled height in order to keep that height
   *  when then keyboard is presented.
   */
  const [absHeight, setAbsHeight] = React.useState(-1);
  const onLayoutSet = (event: any) => {
    // If absHeight has not been set
    if (absHeight === -1) {
      let {x, y, width, height} = event.nativeEvent.layout;
      setAbsHeight(height);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} >
      <View onLayout={onLayoutSet} style={{height: absHeight !== -1 ? absHeight : '100%', paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'column',  justifyContent: 'space-around'}}>
        
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} style={{zIndex: 1}} >
          {/* DateRow */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
            <View style={{flexGrow: 1, paddingLeft: 20}}>
              <Avatar.Icon icon={route.params.icon} size={iconSizes.avatar} style={{}}/>
            </View>
            <DatePicker date={date} setDate={setDate} />
          </View>
          {/* TimeRow */}
          <View style={{ flexDirection: 'row', paddingBottom: 20,  ...(Platform.OS !== 'android' && { zIndex: 10 })}}>
            <TimePicker now={new Date()} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime} 
              toTime={toTime} setToTime={setToTime} />
            </View>

          {/* TextInputRow */}
          <View>
            <ChoiceBasedTextInput label={lang.activityRegistratorTextInputLabel} textInputText={activityText} setTextInputText={setActivityText} 
              choices={ choices } choice={choice} setChoice={setChoice} />
          </View>
        </KeyboardAvoidingView>

        {/* Trash / Cancel / Confirm row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          {route.params?.entry &&
            <IconButton
              icon='delete'
              size={iconSizes.large}
              onPress={() => {
                modifyCalendar.remove(route.params.entry as CalendarEntry);
                onCancel();
              }}
              color={colors.cancel}
            />}
          <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
          <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
