import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, List} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { FlatList } from 'react-native-gesture-handler';

const ValuesStack = createStackNavigator();

/*const ViewTitle = () => (
  <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
    <Title>Värdering</Title>
  </View>
)*/

const ValuesList = () => (
  <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
    <List.Section>
      <List.Subheader>Värdering</List.Subheader>
      <List.Item title="Relation" />
      <List.Item title="Studier/Karriär" />
      <List.Item title="Fritid/Intressen" />
      <List.Item title="Sinne/Kropp/Spirituellt" />
      <List.Item title="Dagligt ansvar" /> 

   </List.Section>
  </View>
  
);





  

export const ValuesScreen = () => {
  return (
    <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <ValuesStack.Screen name="ValuesList" component={ValuesList} />

    </ValuesStack.Navigator>
  );
}