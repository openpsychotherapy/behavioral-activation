import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, Card, Title} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { SettingsScreen } from './SettingsScreen';
import { ActivityInfo } from './info/ActivityInfo';
import { CalendarInfo } from './info/CalendarInfo';
import { ValuesInfo } from './info/ValuesInfo';
import { BehaviouralActivation } from './info/BehaviouralActivation';
import { useTranslation } from 'language/LanguageProvider';

const InformationStack = createStackNavigator();

const ViewContent = ({navigation}: any) => {
  const dict = useTranslation();

  const cardsData = [
    {
      title: dict.informationCardBehaviouralactivation,
      imageUri: {uri: "https://picsum.photos/700"},
      navigateTo: "BehaviouralActivation",
    },
    {
      title: dict.informationCardActivityscreen,
      imageUri: require('../images/activityscreen.png'),
      navigateTo: "ActivityInfo",
    },
    {
      title: dict.informationCardValuesscreen,
      imageUri: require('../images/valuesscreen.png'),
      navigateTo: "ValuesInfo",
    },
    {
      title: dict.informationCardCalenderscreen,
      imageUri: require('../images/calendarscreen.png'),
      navigateTo: "CalenderInfo",
    },
  ];
  const renderItem = ({item}:any) => (
    <Card
    onPress={() => navigation.navigate(item.navigateTo)}
    style={{justifyContent: 'space-evenly', marginHorizontal: 10, marginVertical: 10}}>
        <Card.Content style={{alignItems: 'center'}}>
          <Title>{item.title}</Title>
        </Card.Content>
         <Card.Cover source={item.imageUri} />
      </Card>
  );

  return (
    <FlatList
      data={cardsData}
      renderItem={renderItem}
      keyExtractor={item => item.title}
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
      <InformationStack.Screen name='CalenderInfo' component={CalendarInfo} />
      <InformationStack.Screen name='BehaviouralActivation' component={BehaviouralActivation} />
      <InformationStack.Screen name='Settings' component={SettingsScreen} />
      
    </InformationStack.Navigator>
  );
}
