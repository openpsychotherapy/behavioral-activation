import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { useTranslation } from 'language/LanguageProvider';
import { SettingsScreen } from './SettingsScreen';
import { StyledButton } from './values/StyledButton';
import { CategoryView } from './values/CategoryView';
import { ChooseEntryIconView } from './values/ChooseEntryIconView';
import { AddTopicView } from './values/AddTopicView';
import { AddEntryView } from './values/AddEntryView';
import { EntryView } from './values/EntryView';
import { Values } from 'storage/types';

export type ValuesStackParamList = {
  StartScreenView: {},
  CategoryView: {
    title: string,
    navigateBack: keyof ValuesStackParamList,
    categoryString: string,
  },
  AddTopicView: {
    title: string,
    navigateBack: keyof ValuesStackParamList,
    categoryString: string,
  },
  EntryView: {
    title: string,
    navigateBack: keyof ValuesStackParamList,
    categoryString: string,
  },
  ChooseEntryIconView: {
    title: string,
    navigateBack: keyof ValuesStackParamList,
    categoryString: string,
  },
  AddEntryView: {
    title: string,
    navigateBack: keyof ValuesStackParamList,
    categoryString: string,
    icon: string,
  },
  Settings: {},
};

const ValuesStack = createStackNavigator<ValuesStackParamList>();

type StartScreenViewNavigationProp = StackNavigationProp<
  ValuesStackParamList,
  'StartScreenView'
>;

interface StartScreenViewProps {
  navigation: StartScreenViewNavigationProp;
}

// View for the first screen in values 
const StartScreenView = ({navigation}: StartScreenViewProps) => {
  const lang = useTranslation();

  const buttons: [string, keyof Values][] = [
    [lang.valuesButtonRelations, 'relations'],
    [lang.valuesButtonWork, 'work'],
    [lang.valuesButtonEnjoyment, 'enjoyment'],
    [lang.valuesButtonHealth, 'health'],
    [lang.valuesButtonResponsibilities, 'responsibilities'],
    [lang.valuesButtonPeople, 'people'],
  ];

  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
      <Title style={{ textAlign: 'center' }}>{lang.valuesHeaderEvaluation}</Title>
        {buttons.map(([title, categoryString], index: number) => 
          <StyledButton key={index} name={title} categoryButton={() => {
            navigation.navigate('CategoryView', {
              title,
              categoryString: categoryString as string,
              navigateBack: 'CategoryView',
            });
          }}/>
        )}
    </View>
  );
}

export const ValuesScreen = () => {
  return (
    <ValuesStack.Navigator initialRouteName="StartScreenView" headerMode="float"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <ValuesStack.Screen name="StartScreenView" component={StartScreenView} />
      <ValuesStack.Screen name="CategoryView" component={CategoryView} />
      <ValuesStack.Screen name="AddTopicView" component={AddTopicView}/>
      <ValuesStack.Screen name="EntryView" component={EntryView}/>
      <ValuesStack.Screen name="ChooseEntryIconView" component={ChooseEntryIconView}/>
      <ValuesStack.Screen name="AddEntryView" component={AddEntryView}/>
      <ValuesStack.Screen name="Settings" component={SettingsScreen} />
    </ValuesStack.Navigator>
  );
}
