import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, List, Button} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { FlatList } from 'react-native-gesture-handler';

const ValuesStack = createStackNavigator();

const RelationView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Relation</Text>
  </View>
); 

const CareerView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Studier/karrriär</Text>
  </View>
); 

const InterestsView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Fritid/intressen</Text>
  </View>
);

const MindView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Sinne/Kropp/Spirituellt</Text>
  </View>
);

const ResposibilityView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dagliga ansvar</Text>
  </View>
);

const SupportView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Stödpersoner</Text>
  </View>
);


const CreateButton = (props: any) => {
  return (
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <Button theme={{ roundness: 30 }} contentStyle={{width: 240, height: 70}} compact={true} mode="outlined" onPress={props.function}>
        <Text>{props.name}</Text>
      </Button>
    </View>
      )
}


  
const ViewContent = ({navigation}: any) => {
  
  const relationButton = () => {
    navigation.navigate('Relation');
  };

  const careerButton = () => {
    navigation.navigate('Career');
  };

  const interestsButton = () => {
    navigation.navigate('Interests');
  };

  const mindButton = () => {
    navigation.navigate('Mind');
  };

  const responsibilityButton = () => {
    navigation.navigate('Responsibility');
  };

  const supportButton = () => {
    navigation.navigate('Support');
  };


  return (
    <View style={{flex: 1}}>
    <View style={{flex: 0.10, alignItems: 'center', justifyContent: 'center'}}>
      <Title>Värdering</Title>
    </View>
    <CreateButton name="relation" function={relationButton}/>
    <CreateButton name="Studier/karriär" function={careerButton}/>
    <CreateButton name="Fritid/intressen" function={interestsButton}/>
    <CreateButton name="Sinne/kropp/spirituellt" function={mindButton}/>
    <CreateButton name="Dagliga ansvar" function={responsibilityButton}/>
    <View style={{flex: 0.02, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <CreateButton name="Stödpersoner" function={supportButton}/>
  </View>
  )
}





  

export const ValuesScreen = () => {
  return (
    <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <ValuesStack.Screen name="ViewContent" component={ViewContent} />
      <ValuesStack.Screen name="Relation" component={RelationView} />
      <ValuesStack.Screen name="Career" component={CareerView} />
      <ValuesStack.Screen name="Interests" component={InterestsView} />
      <ValuesStack.Screen name="Mind" component={MindView} />
      <ValuesStack.Screen name="Responsibility" component={ResposibilityView} />
      <ValuesStack.Screen name="Support" component={SupportView} />

    </ValuesStack.Navigator>
  );
}