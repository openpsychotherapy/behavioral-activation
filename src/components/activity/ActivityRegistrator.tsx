import React from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, useTheme } from 'react-native-paper';


import { DatePicker } from './../DatePicker';
import { TimePicker, getCurrentTimeRounded } from './../TimePicker';
import { SuggestiveTextInput } from '../SuggestiveTextInput';


import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const ActivityRegistrator = ({ route, navigation }: any) => {
  // route.params contains information from activity screen

  const lang = useTranslation();
  const [values, modifyValues] = Storage.useValues();

  const { iconSizes } = useTheme();
  const steps = 1;

  const [fromTime, setFromTime] = React.useState(getCurrentTimeRounded(0, steps));
  const [toTime, setToTime] = React.useState(getCurrentTimeRounded(1, steps));

  const [date, setDate] = React.useState(new Date());

  const defaultChoise = {
    value: lang.activityRegistratorActivityDefaultChoise,
    isDefault: true
  }

  const [choise, setChoise] = React.useState(defaultChoise);
  const [activityText, setActivityText] = React.useState('');

  let choises = [ defaultChoise ];


  //Found topics to choose from depending on icon 
  const addTopicEntries = (topics: any) => {
    for(let topicIndex = 0; topicIndex < topics.length; ++topicIndex) {
      for(let entryIndex = 0; entryIndex < topics[topicIndex].entries.length; ++entryIndex){
        const entry = topics[topicIndex].entries[entryIndex];
        if(entry.icon == route.params.icon) {
          choises.push({
            value: entry.text,
            isDefault: false
          });
        }
      }
    }
  };

  addTopicEntries(values.responsibilities);
  addTopicEntries(values.relations);
  addTopicEntries(values.enjoyment);
  addTopicEntries(values.health);
  addTopicEntries(values.work);

  const addTest = () => {
    let entry = {text: 'Wroom', icon: 'car-hatchback'};
    modifyValues.addTopic('responsibilities', 'test');
    modifyValues.addEntry('responsibilities', 'test', entry);
    console.log(choises);
  };

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Icon icon={route.params.icon} size={iconSizes.avatar} />
        <DatePicker date={date} setDate={setDate}  />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TimePicker now={new Date()} defaultTimeOffset={60} steps={steps} fromTime={fromTime} setFromTime={setFromTime} toTime={toTime} setToTime={setToTime} />
      </View>
      <SuggestiveTextInput label={lang.activityRegistratorTextInputLabel} activityText={activityText} setActivityText={setActivityText} choises={ choises } choise={choise} setChoise={setChoise} />
      
    </View>
  );
};
