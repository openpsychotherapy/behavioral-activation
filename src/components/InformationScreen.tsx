import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Card, Title} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { SettingsScreen } from './SettingsScreen';
import { ActivityInfo } from './info/ActivityInfo';
import { CalenderInfo } from './info/CalenderInfo';
import { ValuesInfo } from './info/ValuesInfo';
import { BehaviouralActivation } from './info/BehaviouralActivation';

const InformationStack = createStackNavigator();

const cardsData = [
  {
    title: "BehaviouralActivation",
    imageUri: "https://picsum.photos/700",
    navigateTo: "BehaviouralActivation",
  },
  {
    title: "The Activityscreen",
    imageUri: "https://picsum.photos/700",
    navigateTo: "ActivityInfo",
  },
  {
    title: "The Valuesscreen",
    imageUri: "https://picsum.photos/700",
    navigateTo: "ValuesInfo",
  },
  {
    title: "The Calendarscreen",
    imageUri: "https://picsum.photos/700",
    navigateTo: "CalenderInfo",
  },
];

const ViewContent = ({navigation}: any) => {
  const renderItem = ({item}:any) => (
    <Card
    onPress={() => navigation.navigate(item.navigateTo)}
    style={{marginBottom: 20, padding: 10}}>
        <Card.Content style={{alignItems: 'center'}}>
          <Title>{item.title}</Title>
        </Card.Content>
        <Card.Cover source={{uri: item.imageUri}} />
      </Card>
  );

  return (
    <FlatList
      data={cardsData}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item)}
    >
    </FlatList>
  );
}

export const InformationScreen = () => {
  return (
    <InformationStack.Navigator initialRouteName='Information' headerMode='float'
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <InformationStack.Screen name='Information' component={ViewContent} />
      <InformationStack.Screen name='ActivityInfo' component={ActivityInfo} />
      <InformationStack.Screen name='ValuesInfo' component={ValuesInfo} />
      <InformationStack.Screen name='CalenderInfo' component={CalenderInfo} />
      <InformationStack.Screen name='BehaviouralActivation' component={BehaviouralActivation} />
      <InformationStack.Screen name='Settings' component={SettingsScreen} />
      
    </InformationStack.Navigator>
  );
}
