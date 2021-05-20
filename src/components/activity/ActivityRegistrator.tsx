import React from 'react';
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import { Button, Text, IconButton, Avatar, useTheme, Subheading } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { DatePicker } from '../DatePicker';
import { TimePicker, getCurrentTimeRounded } from '../TimePicker';
import { ChoiceBasedTextInput } from '../ChoiceBasedTextInput';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { ActivitiesEntry } from 'storage/types';

import { ISODate } from 'utils';

export const ActivityRegistrator = ({ route, navigation }: any) => {
  const lang = useTranslation();
  const [settings, modifySettings] = Storage.useSettings();
  const { iconSizes, colors } = useTheme();

  const steps = 1;

  const [values, modifyValues] = Storage.useValues();
  const [activities, modifyActivities] = Storage.useActivities();

  const [fromTime, setFromTime] = React.useState(getCurrentTimeRounded(0, steps));
  const [toTime, setToTime] = React.useState(getCurrentTimeRounded(1, steps));

  const [date, setDate] = React.useState(new Date());

  const [activityText, setActivityText] = React.useState('');

  const [importance, setImportance] = React.useState(5);
  const [enjoyment, setEnjoyment] = React.useState(5);

  const onConfirm = () => {
    // Create entry from information entered by user
    const entry: ActivitiesEntry = {
      text: activityText,
      icon: route.params.icon,
      person: '', // TODO: link to value based on choice
      importance: importance,
      enjoyment: enjoyment,
    };

    // If toTime returns 0 hours its the next day, count it as 24.
    let toHour = toTime.getHours();
    if (toHour === 0) {
      toHour = 24;
    }

    // Add entry att every applicable hour
    modifyActivities.addInterval(ISODate(date), fromTime.getHours(), toHour - 1, entry);

    // Go back
    navigation.navigate('Activities', {activityRegistered: true})
  };


  const onCancel = () => {
    // Go back
    navigation.navigate('Activities', {activityRegistered: false})
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
                style={{flex: 1}} value={5} step={1}
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
                style={{flex: 1}} value={5} step={1}
                minimumValue={0} maximumValue={10}
                onValueChange={(value: number) => {setEnjoyment(value)}}
                minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
              />
              <Text>10</Text>
            </View>
          </View>
        </View>

        {/* Cancel / Confirm row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
          <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
