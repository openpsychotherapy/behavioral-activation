import React from 'react';
import { ValuesStackParamList } from '../ValuesScreen';
import Storage from 'storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Title, useTheme, TextInput, IconButton } from 'react-native-paper';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from 'language/LanguageProvider';

type AddTopicViewRouteProp = RouteProp<
  ValuesStackParamList,
  'AddTopicView'
>;

type AddTopicViewNavigationProp = StackNavigationProp<
  ValuesStackParamList,
  'AddTopicView'
>;

interface AddTopicViewProps {
  route: AddTopicViewRouteProp;
  navigation: AddTopicViewNavigationProp;
}

// View when adding a new topic
export const AddTopicView = ({route, navigation}: AddTopicViewProps) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const [people, modifyPeople] = Storage.usePeople();
  const { title, navigateBack, categoryString } = route.params;
  const lang = useTranslation();
  const {colors, iconSizes} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Title>{title}</Title>
      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        <TextInput
        value={text}
        onChangeText={setText}
        mode={'outlined'} 
        style={{paddingHorizontal: '15%'}}
        placeholder={lang.valuesPlaceholder}
        multiline={true}
       />
      </View>
      <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <IconButton
            icon='close'
            size={iconSizes.large}
            color={colors.cancel}
            onPress={() => navigation.navigate(navigateBack, {})}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <IconButton icon='check' size={iconSizes.large} color={colors.confirm} onPress={() => {
            navigation.navigate(navigateBack, {});
            if (categoryString != 'people') {
              modifyValues.addTopic(categoryString, text);
            } else {
              modifyPeople.add(text);
            }
          }} />  
        </View>
      </View>
     </View>
    </TouchableWithoutFeedback>
  );
}