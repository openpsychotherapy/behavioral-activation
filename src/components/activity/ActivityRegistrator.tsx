import React from 'react';
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import { Button, Text, IconButton, Avatar, useTheme, Subheading } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { DatePicker } from '../DatePicker';
import { TimePicker, getCurrentTimeRounded } from '../TimePicker';
import { ChoiceBasedTextInput } from '../ChoiceBasedTextInput';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { ActivitiesDay, ActivitiesEntry } from 'storage/types';
import { activityDayGt } from 'storage/activities';

import { ISODate } from 'utils';
import { getDaysInMonth } from 'react-native-paper-dates/lib/typescript/src/Date/dateUtils';
import { ActivityStackParamList } from '../ActivityScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type Route = RouteProp<
  ActivityStackParamList,
  'ActivityRegistration'
>;
type Navigation = StackNavigationProp<
  ActivityStackParamList,
  'ActivityRegistration'
>;

interface Props {
  route: Route;
  navigation: Navigation;
}

export const ActivityRegistrator = ({ route, navigation }: Props) => {
  const lang = useTranslation();
  const [settings, modifySettings] = Storage.useSettings();
  const { iconSizes, colors } = useTheme();
  const [values, modifyValues] = Storage.useValues();
  const [activities, modifyActivities] = Storage.useActivities();

  const steps = 1;
  let dateDefault = new Date();
  let fromTimeRoundedDefault = getCurrentTimeRounded(0, steps);
  let toTimeRoundedDefault = getCurrentTimeRounded(1, steps);
  let activityTextDefault = '';
  let importanceDefault = 5;
  let enjoymentDefault = 5;

  // Overwrite default values from entry (if it exists)
  if (route.params?.entry && route.params?.entryStartIndex && route.params?.entryEndIndex && route.params?.day) {
    // Set default values
    dateDefault = new Date(route.params?.day.date);
    fromTimeRoundedDefault = new Date(
      dateDefault.getFullYear(),
      dateDefault.getMonth(),
      dateDefault.getDate(),
      route.params?.entryStartIndex
    );
    toTimeRoundedDefault = new Date(
      dateDefault.getFullYear(),
      dateDefault.getMonth(),
      dateDefault.getDate(),
      route.params?.entryEndIndex + 1
    );
    activityTextDefault = route.params?.entry.text;
    importanceDefault = route.params?.entry.importance;
    enjoymentDefault = route.params?.entry.enjoyment;
  }

  // Create all React states
  const [fromTime, setFromTime] = React.useState(fromTimeRoundedDefault);
  const [toTime, setToTime] = React.useState(toTimeRoundedDefault);
  const [date, setDate] = React.useState(dateDefault);
  const [activityText, setActivityText] = React.useState(activityTextDefault);
  const [importance, setImportance] = React.useState(importanceDefault);
  const [enjoyment, setEnjoyment] = React.useState(enjoymentDefault);

  // Confirm callback
  const onConfirm = () => {
    // If toTime returns 0 hours its the next day, count it as 24.
    let toHour = toTime.getHours();
    let oldToHour = toTimeRoundedDefault.getHours();
    if (toHour === 0) toHour = 24;
    if (oldToHour === 0) oldToHour = 24;

    // Create entry from information entered by user
    const entry: ActivitiesEntry = {
      text: activityText,
      icon: route.params.icon,
      person: route.params?.entry ? route.params?.entry.person : '',
      importance: importance,
      enjoyment: enjoyment,
    };

    const oldEntry: ActivitiesEntry = {
      text: activityTextDefault,
      icon: route.params.icon,
      person: route.params?.entry ? route.params?.entry.person : '',
      importance: importanceDefault,
      enjoyment: enjoymentDefault,
    };

    if (!route.params?.entry) {
      // Add entry att every applicable hour
      modifyActivities.addInterval(ISODate(date), fromTime.getHours(), toHour - 1, entry);

      // Go back
      navigation.navigate('Activities', {activityRegistered: true});
    } else {
      modifyActivities.modifyInterval(fromTimeRoundedDefault.getHours(), oldToHour - 1, fromTime.getHours(), toHour - 1, ISODate(dateDefault), ISODate(date), entry);
      navigation.goBack();
    }
  };

  // Cancellation callback
  const onCancel = () => {
    // Go back
    if (route.params?.entry) {
      navigation.goBack();
    } else {
      navigation.navigate('Activities', {activityRegistered: false})
    }
  };

  // Remove callback
  const onRemove = () => {
    modifyActivities.removeInterval((route.params.day as ActivitiesDay).date, route.params.entryStartIndex as number, route.params.entryEndIndex as number);
    onCancel();
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
            <TimePicker now={dateDefault} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime}
              toTime={toTime} setToTime={setToTime} />
          </View>

          {/* TextInputRow */}
          <View>
            <Subheading>{lang.activityRegistratorActivity}</Subheading>
            <ChoiceBasedTextInput
              style={{ display: activityText == '' ? undefined : 'none'}}
              icon={route.params.icon}
              label={lang.activityRegistratorTextInputLabel}
              text={activityText}
              setText={setActivityText}
            />
            <View style={{ alignItems: 'center' }}>
              <Button
                style={{ display: activityText == '' ? 'none' : undefined }}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon='delete'
                uppercase={false}
                onPress={() => setActivityText('')}
                mode='outlined'
              >
                {activityText}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/*Importance slider */}
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
          <View style={{flexDirection: 'column', width: '80%'}}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{lang.activityRegistratorImporanceLabel + ': '}</Text>
              <Text>{importance}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text>0</Text>
              <Slider
                style={{flex: 1}} value={importance} step={1}
                minimumValue={0} maximumValue={10}
                onValueChange={(value: number) => {setImportance(value)}}
                minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
              />
              <Text>10</Text>
            </View>
          </View>
        </View>

        {/* Enjoyment slider */}
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
          <View style={{flexDirection: 'column', width: '80%'}}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{lang.activityRegistratorEnjoymentLabel + ': '}</Text>
              <Text>{enjoyment}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text>0</Text>
              <Slider
                style={{flex: 1}} value={enjoyment} step={1}
                minimumValue={0} maximumValue={10}
                onValueChange={(value: number) => {setEnjoyment(value)}}
                minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
              />
              <Text>10</Text>
            </View>
          </View>
        </View>

        {/* Remove / Cancel / Confirm row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          {route.params?.entry &&
            <IconButton icon='delete' size={iconSizes.large} onPress={() => onRemove()} color={colors.cancel} />
          }
          <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
          <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
