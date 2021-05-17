import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Menu, TextInput, Portal, Dialog, Surface } from 'react-native-paper';
import { useTranslation } from 'language/LanguageProvider';
import { ValuesTopic } from 'storage/types';
import Storage from 'storage';

interface Props {
  label: string;
  text: string;
  setText: (text: string) => void;
}

export const ChoiceBasedTextInput = ({ label, text, setText }: Props) => {

  const lang = useTranslation();
  const [values, modifyValues] = Storage.useValues();
  const [inputVisible, setInputVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const openInput = () => setInputVisible(true);
  const closeInput = () => { setInputVisible(false); setText(inputText); }
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Find topics to choose from depending on input icon
  let choices: string[] = [];
  const addTopicEntries = (topics: ValuesTopic) => {
    for (let topicIndex = 0; topicIndex < topics.length; ++topicIndex) {
      for (let entryIndex = 0; entryIndex < topics[topicIndex].entries.length; ++entryIndex){
        const entry = topics[topicIndex].entries[entryIndex];
        // TODO: if (entry.icon == route.params.icon) {
          choices.push(entry.text);
        //}
      }
    }
  };

  // Go through all categories in values
  Object.keys(values).forEach(key => addTopicEntries(values[key]));

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Portal>
        {/* This does not really work */}
        <Dialog visible={inputVisible} onDismiss={closeInput} style={{ marginVertical: 80, marginHorizontal: 40 }}>
          <TextInput
            autoFocus={true}
            onBlur={closeInput}
            mode='flat'
            label={label}
            value={inputText}
            placeholder={''}
            onChangeText={setInputText}
          />
        </Dialog>
      </Portal >
      <Button icon='plus' onPress={openInput} mode='outlined'>
        text
      </Button>
      {choices.length != 0 &&
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

