import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import { Button, IconButton, Avatar, useTheme } from 'react-native-paper';

import { DatePicker } from '../DatePicker';
import { TimePicker, getCurrentTimeRounded } from '../TimePicker';
import { ChoiceBasedTextInput } from '../ChoiceBasedTextInput';
import { PersonButton } from './PersonButton';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { CalendarEntry } from 'storage/types';
import { RouteProp } from '@react-navigation/core';
import { CalendarStackParamList } from '../CalendarScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ISODate, ISOTime } from 'utils';

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

  const steps = 4;

  let activityTextDefault = '';
  let dateDefault = new Date();
  let fromTimeDefault = getCurrentTimeRounded(0, steps);
  let toTimeDefault = getCurrentTimeRounded(1, steps);
  let personDefault = '';

  // Overwrite default values from entry (if it exists)
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
    personDefault = entry.person;
  }

  const [calendar, modifyCalendar] = Storage.useCalendar();

  const [fromTime, setFromTime] = useState(fromTimeDefault);
  const [toTime, setToTime] = useState(toTimeDefault);

  const [date, setDate] = useState(dateDefault);

  const [activityText, setActivityText] = useState(activityTextDefault);

  const [person, setPerson] = useState(personDefault);



  const onConfirm = () => {
    const isoDateString = ISODate(date);

    // Create entry from information entered by user
    const entry: CalendarEntry = {
      text: activityText,
      icon: route.params.icon,
      person: person,
      date: isoDateString,
      start: ISOTime(fromTime),
      end: ISOTime(toTime),
      isRegistered: false,
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  /**
   * This hook/function saves the auto-scaled height in order to keep that height
   *  when then keyboard is presented.
   */
  const [absHeight, setAbsHeight] = useState(-1);
  const onLayoutSet = (event: any) => {
    // If absHeight has not been set
    if (absHeight === -1) {
      let { height } = event.nativeEvent.layout;
      setAbsHeight(height);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} >
      <View onLayout={onLayoutSet} style={{height: absHeight !== -1 ? absHeight : '100%', paddingHorizontal: 10, paddingVertical: 20,  justifyContent: 'space-between'}}>

        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} style={{zIndex: 1}} >
          {/* DateRow */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
            <View style={{flexGrow: 1, paddingLeft: 20}}>
              <Avatar.Icon icon={route.params.icon} size={iconSizes.avatar} />
            </View>
            <DatePicker date={date} setDate={setDate} />
          </View>

          {/* TimeRow */}
          <View style={{ flexDirection: 'row', paddingBottom: 20,  ...(Platform.OS !== 'android' && { zIndex: 10 })}}>
            <TimePicker now={new Date()} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime}
              toTime={toTime} setToTime={setToTime} />
          </View>

          {/* TextInputRow */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {activityText == '' ?
              <ChoiceBasedTextInput label={lang.calendarRegistratorTextInputLabel} text={activityText} setText={setActivityText} />
              :
              <Button icon='close' onPress={() => setActivityText('')} mode='outlined' >
                {activityText}
              </Button>
            }
          </View>

        </KeyboardAvoidingView>

        {/* Person row */}
        <View style={{ alignItems: 'center', paddingBottom: 20,  ...(Platform.OS !== 'android' && { zIndex: 10 })}}>
          {person == '' ?
            <PersonButton person={person} setPerson={setPerson} />
            :
            <Button icon='close' onPress={() => setPerson('')} mode='outlined' >
              {person}
            </Button>
          }
        </View>

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
