import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, List, Button} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { FlatList } from 'react-native-gesture-handler';

const ValuesStack = createStackNavigator();

const TitleText = () => (
    <Title>Värdering</Title>
)

const RelationButton = () => (

  <Button mode="outlined" onPress={() => console.log('Pressed')}>
    Relation
  </Button>

)
const StudierButton = () => (
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
    Studier/Karriär
  </Button>


)
const FritidButton = () => (
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
    Fritid/intressen
  </Button>
)

const ViewContent = () => (
  <View style={{flex: 1}}>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
    <Title>Värdering</Title>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Relation
      </Button>
    </View>
    <View style={{ flex: 0.14,  alignItems: 'center', justifyContent: 'center'}}>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Studier/Karriär
      </Button>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Fritid/intressent
      </Button>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Sinne/Kropp/Spirituellt
      </Button>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Dagliga ansvar
      </Button>
    </View>
    <View style={{flex: 0.05, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Stödpersoner
      </Button>
    </View>
  </View>
)


  

export const ValuesScreen = () => {
  return (
    <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <ValuesStack.Screen name="RelationButton" component={ViewContent} />
      

    </ValuesStack.Navigator>
  );
}