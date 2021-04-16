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

export const SuggestiveTextInput = (props: {label: string, activityText: string, setActivityText: React.Dispatch<React.SetStateAction<string>>, 
  choises: Choise[], choise: Choise, setChoise: React.Dispatch<React.SetStateAction<Choise>>}) => {
  
  const lang = useTranslation();
  const [visible, setVisible] = React.useState(false);

  let choiseComponents = []
  for (let i = 0; i < props.choises.length; ++i) {
    const choise = props.choises[i];
    
    choiseComponents.push(
      <TouchableWithoutFeedback onPress={()=>{ props.setChoise(choise); setVisible(false) }}>
        <Surface style={{ flexDirection: 'row', elevation: visible ? 5 : 0, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center' }} key={'c_' + i}>
          <Text style={{ padding: 10}}>{choise.value}</Text>
        </Surface>
      </TouchableWithoutFeedback>
    );
  }


  /* Old picker
  <Picker
    selectedValue={props.choise.value}
    mode='dropdown'
    onValueChange={(itemValue: ItemValue, itemIndex: number) => props.setChoise(props.choises[itemIndex])}
    >
    { choiseComponents }
  </Picker>
  */

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
        label={props.label}
        editable={props.choise.isDefault}
        value={!props.choise.isDefault ? props.choise.value : props.activityText}
        placeholder={''}
        onChangeText={(text: string) => {props.setActivityText(text)}}
      />
    </View>
  );
}


