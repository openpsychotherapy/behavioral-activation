import React from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, TextInput, Portal, Dialog, Surface } from 'react-native-paper';
import { useTranslation } from 'language/LanguageProvider';

type Choice = {
  value: string,
  isDefault: boolean
}

/**
 * A text input component that gives prescribed alternatives.
 *
 * @example
 * ```
 * const [choice, setChoice] = React.useState(defaultChoice);
 * const [activityText, setActivityText] = React.useState('');
 * 
 * return (
 *   <ChoiceBasedTextInput label={'What have you been doing?'} textInputText={activityText} setTextInputText={setActivityText} 
 *     choices={ ['Write text'] } choice={choice} setChoice={setChoice} />
 * );
 * 
 * ```
 * 
 * @param label - A text label depending on language
 * @param textInputText - Text value for default choice (eg a hook)
 * @param setTextInputText - Set function for default choice text (eg a hook)
 * @param choices - A list with all the prescribed choices
 * @param choice - Choice value as a Date object (eg a hook)
 * @param setChoice - Choice time set function (eg a hook)
 * 
 * @returns The ChoiceBasedTextInput component
 *
 */
export const ChoiceBasedTextInput = (props: {label: string, textInputText: string, setTextInputText: React.Dispatch<React.SetStateAction<string>>, 
  choices: Choice[], choice: Choice, setChoice: React.Dispatch<React.SetStateAction<Choice>>}) => {
  
  const lang = useTranslation();
  const [visible, setVisible] = React.useState(false);

  let choiceComponents = []
  for (let i = 0; i < props.choices.length; ++i) {
    const choice = props.choices[i];
    
    // List of all items as surface components
    choiceComponents.push(
      <TouchableWithoutFeedback onPress={()=>{ props.setChoice(choice); setVisible(false) }} key={'c_' + i}>
        <Surface style={{ flexDirection: 'row', elevation: visible ? 5 : 0, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center' }}>
          <Text style={{ padding: 10}}>{choice.value}</Text>
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
              {choiceComponents}
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal >

      <Surface style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, elevation: 0 }}>
          <Text style={{flex: 1, flexGrow: 1, paddingHorizontal: 12}}>{props.choice.value}</Text>
          <Button onPress={()=> setVisible(true)}>{lang.choiceBasedTextInputChangeLabel}</Button>
      </Surface>
      
      <TextInput
        mode='outlined'
        label={props.label}
        editable={props.choice.isDefault}
        value={!props.choice.isDefault ? props.choice.value : props.textInputText}
        placeholder={''}
        onChangeText={(text: string) => {props.setTextInputText(text)}}
      />
    </View>
  );
}

