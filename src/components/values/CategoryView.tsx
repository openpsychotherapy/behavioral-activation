import React from 'react';
import { ValuesStackParamList } from '../ValuesScreen';
import Storage from 'storage';
import { ValuesTopic } from 'storage/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryButton } from './CategoryButton';
import { Title, FAB} from 'react-native-paper';
import { View, ScrollView } from 'react-native';

interface CategoryViewProps {
  route: CategoryViewRouteProp;
  navigation: CategoryViewNavigationProp;
}

type CategoryViewRouteProp = RouteProp<
  ValuesStackParamList,
  'CategoryView'
>;

type CategoryViewNavigationProp = StackNavigationProp<
  ValuesStackParamList,
  'CategoryView'
>;

export const CategoryView = ({route, navigation}: CategoryViewProps) => {
  const { title, navigateBack, categoryString } = route.params;
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();

  const content = categoryString != 'people' ?
    values[categoryString].map((topic: ValuesTopic, i: number) => 
      <CategoryButton
        key={i}
        topic={topic}
        categoryString={categoryString}
        onPress={() => {
          navigation.navigate('EntryView', {
            title: topic.name,
            navigateBack: navigateBack,
            categoryString: categoryString
          })
        }}
      />
    ) :
    people.map((person: string, i: number) =>    
      <CategoryButton
        key={i}
        topic={{name: person, entries: []}}
        categoryString={categoryString}
        onPress={() => {}}
      />
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
        icon='plus'
        onPress={() => {
          navigation.navigate('AddTopicView', {
            title: title,
            navigateBack: navigateBack,
            categoryString: categoryString,
          });
        }}
      />
    </View>
  );
}
