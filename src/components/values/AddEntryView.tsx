import React from 'react';
import { ValuesStackParamList } from '../ValuesScreen';
import Storage from 'storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Title, useTheme, TextInput, IconButton, Surface, Avatar } from 'react-native-paper';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from 'language/LanguageProvider';

type AddEntryViewRouteProp = RouteProp<
  ValuesStackParamList,
  'AddEntryView'
>;

type AddEntryViewNavigationProp = StackNavigationProp<
  ValuesStackParamList,
  'AddEntryView'
>;

interface AddEntryViewProps {
  route: AddEntryViewRouteProp;
  navigation: AddEntryViewNavigationProp;
}

export const AddEntryView = ({route, navigation}: AddEntryViewProps) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const { title, navigateBack, categoryString, icon } = route.params;
  const lang = useTranslation();
  const {colors, iconSizes} = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
      <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Surface style={{ borderRadius: 100, elevation: 3}}>
          <Avatar.Icon icon={icon} size={iconSizes.avatar} />
        </Surface >
      <View style={{ width: '5%', height: '5%' }} />
        <Title>{title}</Title>

      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        <TextInput
          value={text}
          onChangeText={setText}
          mode={'outlined'}
          style={{ paddingHorizontal: '15%' }}
          placeholder={lang.valuesPlaceholder}
          multiline={true} />
      </View>
      <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <IconButton icon='close' size={iconSizes.large} color={colors.cancel} onPress={() => {
            navigation.pop(2);
          }} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <IconButton icon='check' size={iconSizes.large} color={colors.confirm} onPress={() => {
            modifyValues.addEntry(categoryString, title, {
              icon: icon,
              text: text,
            });
            navigation.pop(2);
          }} />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}
