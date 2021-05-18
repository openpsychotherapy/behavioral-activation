import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Menu, TextInput, Portal, Dialog, Surface } from 'react-native-paper';
import { useTranslation } from 'language/LanguageProvider';
import { ValuesTopic } from 'storage/types';
import Storage from 'storage';

interface Props {
  label: string;
  icon: string;
  text: string;
  setText: (text: string) => void;
  style: any;
}

export const ChoiceBasedTextInput = ({ label, icon, text, setText, style }: Props) => {

  const lang = useTranslation();
  const [values, modifyValues] = Storage.useValues();
  const [inputVisible, setInputVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const openInput = () => setInputVisible(true);
  const closeInput = () => setInputVisible(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Find topics to choose from depending on input icon
  let choices: string[] = [];
  const addTopicEntries = (topics: ValuesTopic[]) => {
    for (let topicIndex = 0; topicIndex < topics.length; ++topicIndex) {
      for (let entryIndex = 0; entryIndex < topics[topicIndex].entries.length; ++entryIndex){
        const entry = topics[topicIndex].entries[entryIndex];
        if (entry.icon == icon) {
          choices.push(entry.text);
        }
      }
    }
  };

  // Go through all categories in values
  Object.keys(values).forEach(key => addTopicEntries(values[key]));

  useEffect(() => {
    if (!inputVisible && inputText != '') {
      setText(inputText);
      setInputText('');
    }
  }, [inputVisible]);

  return (
    <View style={{ ...style, flexDirection: 'row', justifyContent: 'space-evenly' }} >
      {inputVisible ? 
        <TextInput
          style={{ width: '100%' }}
          autoFocus={true}
          onBlur={closeInput}
          mode='flat'
          label={label}
          value={inputText}
          placeholder={''}
          onChangeText={setInputText}
        />
        :
        <Button icon='plus' onPress={openInput} mode='outlined'>
          text
        </Button>
      }
      {choices.length != 0 && !inputVisible &&
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button icon='plus' onPress={openMenu} mode='outlined'>
              värdering
            </Button>
          }
        >
          {choices.map((c, index) =>
            <Menu.Item
              onPress={() => { setText(c); closeMenu(); }}
              title={c}
              key={index}
            />
          )}
        </Menu>
      }
    </View>
  );
}

