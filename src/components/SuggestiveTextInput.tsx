import React from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, TextInput, Portal, Dialog, Surface } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { useTranslation } from 'language/LanguageProvider';

type Choise = {
  value: string,
  isDefault: boolean
}

/**
 * A text input component that gives prescribed alternatives.
 *
 * @example
 * ```
 * const [choise, setChoise] = React.useState(defaultChoise);
 * const [activityText, setActivityText] = React.useState('');
 * 
 * return (
 *   <SuggestiveTextInput label={'What have you been doing?'} textInputText={activityText} setTextInputText={setActivityText} 
 *     choises={ ['Write text'] } choise={choise} setChoise={setChoise} />
 * );
 * 
 * ```
 * 
 * @param label - A text label depending on language
 * @param textInputText - Text value for default choise (eg a hook)
 * @param setTextInputText - Set function for default choise text (eg a hook)
 * @param choises - A list with all the prescribed choises
 * @param choise - Choise value as a Date object (eg a hook)
 * @param setChoise - Choise time set function (eg a hook)
 * 
 * @returns The SuggestiveTextInput component
 *
 */
export const SuggestiveTextInput = (props: {label: string, textInputText: string, setTextInputText: React.Dispatch<React.SetStateAction<string>>, 
  choises: Choise[], choise: Choise, setChoise: React.Dispatch<React.SetStateAction<Choise>>}) => {
  
  const lang = useTranslation();
  const [visible, setVisible] = React.useState(false);

  let choiseComponents = []
  for (let i = 0; i < props.choises.length; ++i) {
    const choise = props.choises[i];
    
    // List of all items as surface components
    choiseComponents.push(
      <TouchableWithoutFeedback onPress={()=>{ props.setChoise(choise); setVisible(false) }} key={'c_' + i}>
        <Surface style={{ flexDirection: 'row', elevation: visible ? 5 : 0, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center' }}>
          <Text style={{ padding: 10}}>{choise.value}</Text>
        </Surface>
      </TouchableWithoutFeedback>
    );
  }


  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ marginVertical: 80, marginHorizontal: 40 }}>
          <Dialog.ScrollArea>
            <ScrollView style={{paddingVertical: 25 }}>
              {choiseComponents}
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal >

      <Surface style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, elevation: 2 }}>
          <Text style={{flex: 1, flexGrow: 1, paddingHorizontal: 12}}>{props.choise.value}</Text>
          <Button onPress={()=> setVisible(true)}>{lang.suggestiveTextInputChangeLabel}</Button>
      </Surface>
      
      <TextInput
        mode='outlined'
        label={props.label}
        editable={props.choise.isDefault}
        value={!props.choise.isDefault ? props.choise.value : props.textInputText}
        placeholder={''}
        onChangeText={(text: string) => {props.setTextInputText(text)}}
      />
    </View>
  );
}


