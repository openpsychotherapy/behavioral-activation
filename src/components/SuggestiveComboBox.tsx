import React from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

type Choise = {
  value: string,
  isDefault: boolean
}

export const SuggestiveComboBox = (props: {label: string, activityText: string, setActivityText: React.Dispatch<React.SetStateAction<string>>, 
  choises: Choise[], choise: Choise, setChoise: React.Dispatch<React.SetStateAction<Choise>>}) => {
  
  let choiseComponents = []
  for (let i = 0; i < props.choises.length; ++i) {
    const choise = props.choises[i];
    
    choiseComponents.push(
      <Picker.Item label={choise.value} value={choise.value} key={'c_' + i} />
    );
  }


  return (
    <View>
      <Picker
        selectedValue={props.choise.value}
        mode='dropdown'
        onValueChange={(itemValue: ItemValue, itemIndex: number) => props.setChoise(props.choises[itemIndex])}
        >
        { choiseComponents }
      </Picker>
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


