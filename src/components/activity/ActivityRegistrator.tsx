import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, Platform  } from 'react-native';
import { Text, IconButton, Avatar, useTheme } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { DatePicker } from '../DatePicker';
import { TimePicker, getCurrentTimeRounded } from '../TimePicker';
import { SuggestiveTextInput } from '../SuggestiveTextInput';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const ActivityRegistrator = ({ route, navigation }: any) => {
  // route.params contains information from activity screen

  const lang = useTranslation();
  const { iconSizes, colors } = useTheme();

  const steps = 1;
  const defaultChoise = {
    value: lang.activityRegistratorActivityDefaultChoise,
    isDefault: true
  }
  let choises = [ defaultChoise ];


  const [values, modifyValues] = Storage.useValues();
  const [activities, modifyActivities] = Storage.useActivities();
  
  const [fromTime, setFromTime] = React.useState(getCurrentTimeRounded(0, steps));
  const [toTime, setToTime] = React.useState(getCurrentTimeRounded(1, steps));
  
  const [date, setDate] = React.useState(new Date());
  
  const [choise, setChoise] = React.useState(defaultChoise);
  const [activityText, setActivityText] = React.useState('');

  const [importance, setImportance] = React.useState(5); 
  const [enjoyment, setEnjoyment] = React.useState(5);



  // Find topics to choose from depending on input icon
  const addTopicEntries = (topics: any) => {
    for(let topicIndex = 0; topicIndex < topics.length; ++topicIndex) {
      for(let entryIndex = 0; entryIndex < topics[topicIndex].entries.length; ++entryIndex){
        const entry = topics[topicIndex].entries[entryIndex];

        // If icons match, include it in choises
        if(entry.icon == route.params.icon) {
          choises.push({
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
    const entryText = choise.isDefault ? activityText : choise.value;
    
    // Create entry from information entered by user
    const entry = {
      text: entryText,
      icon: route.params.icon,
      person: '', // TODO: link to value based on choise
      meaningful: importance,
      entertaining: enjoyment,
    };

    // If toTime returns 0 hours its the next day, count it as 24.
    let toHour = toTime.getHours();
    if (toHour === 0) {
      toHour = 24;
    }

    // Splitting at 'T' to extract only the date from the ISO string.
    const isoDateString = date.toISOString().split('T')[0];

    // Add entry att every applicable hour
    for(let i = fromTime.getHours(); i < toHour; ++i) {
      modifyActivities.add(isoDateString, i, entry);
    }

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
    if(absHeight === -1) {
      var {x, y, width, height} = event.nativeEvent.layout;
      setAbsHeight(height);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={{backgroundColor: 'red'}}>
      <View onLayout={onLayoutSet} style={{height: absHeight !== -1 ? absHeight : '100%', padding: 10, flexDirection: 'column',  justifyContent: 'space-evenly'}}>
        
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} style={{ paddingVertical: 10, zIndex: 1}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{flex: 1, flexGrow: 1}}>
              <Avatar.Icon icon={route.params.icon} size={iconSizes.avatar} />
            </View>
            <DatePicker date={date} setDate={setDate} />
          </View>

          <View style={{ flexDirection: 'row', ...(Platform.OS !== 'android' && { zIndex: 10 })}}>
            <TimePicker now={new Date()} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime} 
              toTime={toTime} setToTime={setToTime} />
          </View>

          <View>
            <SuggestiveTextInput label={lang.activityRegistratorTextInputLabel} textInputText={activityText} setTextInputText={setActivityText} 
              choises={ choises } choise={choise} setChoise={setChoise} />
          </View>
        </KeyboardAvoidingView>
        

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flexDirection: 'column', width: '80%'}}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{lang.activityRegistratorImporanceLabel + ": "}</Text>
              <Text>{importance}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text>0</Text>
              <Slider
                style={{flex: 1}} value={5} step={1}
                minimumValue={0} maximumValue={10}
                onValueChange={(value: number) => {setImportance(value)}}
                minimumTrackTintColor={colors.accent} maximumTrackTintColor="#000000"
              />
              <Text>10</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flexDirection: 'column', width: '80%'}}>
            <View style={{ flexDirection: 'row'}}>
              <Text>{lang.activityRegistratorEnjoymentLabel + ": "}</Text>
              <Text>{enjoyment}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text>0</Text>
              <Slider style={{flex: 1}} value={5} step={1}
                minimumValue={0} maximumValue={10}
                onValueChange={(value: number) => {setEnjoyment(value)}}
                minimumTrackTintColor={colors.accent} maximumTrackTintColor="#000000"
              />
              <Text>10</Text>
            </View>
          </View>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
          <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
