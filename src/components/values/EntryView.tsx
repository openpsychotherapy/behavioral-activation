import React from 'react';
import { ValuesStackParamList } from '../ValuesScreen';
import Storage from 'storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Title, FAB } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { EntryButton } from './EntryButton';
import { ValuesEntry } from 'storage/types';


type EntryViewRouteProp = RouteProp<
ValuesStackParamList,
'EntryView'
>;

type EntryViewNavigationProp = StackNavigationProp<
ValuesStackParamList,
'EntryView'
>;

interface EntryViewProps {
route: EntryViewRouteProp;
navigation: EntryViewNavigationProp;
}

// View for entries
export const EntryView = ({route, navigation}: EntryViewProps) => {
const { title, navigateBack, categoryString } = route.params;
const [values, modifyValues] = Storage.useValues();

const category = values[categoryString as string];
const index = values[categoryString].findIndex(t => t.name === title);
// Creates all the entries for the right topic
const content = category[index].entries.map((entry: ValuesEntry, i: number) => 
  <EntryButton
    key={i}
    name={entry.text}
    icon={entry.icon}
    category={categoryString}
    topic={category[index].name}
    entry={entry}
    itemToDelete="entry" />
);

return (
  <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-evenly' }}>
    <Title style={{ textAlign: 'center', marginTop: 20 }}>{title}</Title>
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {content}
    </ScrollView>
    <FAB
      style={{
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
      }}
      icon='pencil'
      onPress={() => {
        navigation.navigate('ChooseEntryIconView', {
          title: title,
          navigateBack: navigateBack,
          categoryString: categoryString
        });
      }}
    />
  </View>
  );
}
