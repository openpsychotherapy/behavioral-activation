import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, Button, TextInput} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'language/LanguageProvider';

const ValuesStack = createStackNavigator();



const topicTextInput = (props:any) => {
  const [text, setText] = React.useState('');

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2,justifyContent: 'center'}}>
      <TextInput
      value={text}
      onChangeText={(text: string) => setText(text)}
      mode={"outlined"}
      //style={{flex: 1, paddingVertical: 200, paddingHorizontal: 50, height: 200, width: 400}}
     
      style={{flex: 0.5, paddingHorizontal: 50, justifyContent: 'flex-start'}}
      label={props.name}
      placeholder={"Skriv här"}
      multiline={true}
     
     
      
    />
      </View>

     </View>

  )
}
  



const CareerView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Karriär</Text>
  </View>
); 

const InterestsView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Intressen</Text>
  </View>
);

const MindView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Sinne</Text>
  </View>
);

const ResposibilityView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Ansvar</Text>
  </View>
);

const SupportView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Stöd</Text>
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

  const lang = useTranslation();
  
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
    <CreateButton name={lang.valuesButtonRelationships} function={relationButton}/>
    <CreateButton name={lang.valuesButtonCareer} function={careerButton}/>
    <CreateButton name={lang.valuesButtonInterests} function={interestsButton}/>
    <CreateButton name={lang.valuesButtonMind} function={mindButton}/>
    <CreateButton name={lang.valuesButtonResponsibility} function={responsibilityButton}/>
    <View style={{flex: 0.02, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <CreateButton name={lang.valuesButtonSupport} function={supportButton}/>
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
      <ValuesStack.Screen name="Relation" component={topicTextInput} />
      <ValuesStack.Screen name="Career" component={CareerView} />
      <ValuesStack.Screen name="Interests" component={InterestsView} />
      <ValuesStack.Screen name="Mind" component={MindView} />
      <ValuesStack.Screen name="Responsibility" component={ResposibilityView} />
      <ValuesStack.Screen name="Support" component={SupportView} />

    </ValuesStack.Navigator>
  );
}