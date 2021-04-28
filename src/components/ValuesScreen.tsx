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
  
  const relationsButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonRelations,
      navigateBack: 'CategoryView',
      categoryString: 'relations',
    });
  };

  const workButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonWork,
      navigateBack: 'CategoryView',
      categoryString: 'work',
    });
  };

  const enjoymentButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonEnjoyment,
      navigateBack: 'CategoryView',
      categoryString: 'enjoyment',
    });
  };

  const healthButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonHealth,
      navigateBack: 'CategoryView',
      categoryString: 'health',
    });
  };

  const responsibilitiesButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonResponsibilities,
      navigateBack: 'CategoryView',
      categoryString: 'responsibilities',
    });
  };

  const peopleButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonPeople,
      navigateBack: 'CategoryView',
      categoryString: 'people',
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
      <Title style={{ textAlign: 'center' }}>{lang.valuesHeaderEvaluation}</Title>
      <StyledButton name={lang.valuesButtonRelations} categoryButton={relationsButton}/>
      <StyledButton name={lang.valuesButtonWork} categoryButton={workButton}/>
      <StyledButton name={lang.valuesButtonEnjoyment} categoryButton={enjoymentButton}/>
      <StyledButton name={lang.valuesButtonHealth} categoryButton={healthButton}/>
      <StyledButton name={lang.valuesButtonResponsibilities} categoryButton={responsibilitiesButton}/>
      <StyledButton name={lang.valuesButtonPeople} categoryButton={peopleButton}/>
    </View>
  );
}

export const ValuesScreen = () => {
  return (
    <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
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