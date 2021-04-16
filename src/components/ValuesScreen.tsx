import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Title, Button, TextInput, FAB, IconButton, Surface} from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'language/LanguageProvider';

const ValuesStack = createStackNavigator();

const CircleButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
  }

const topicTextInput = (props:any) => {
  const [text, setText] = React.useState('');

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Title style={{fontSize: 25}}>{props.name}</Title>
      </View>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
      <TextInput
      value={text}
      onChangeText={(text: string) => setText(text)}
      mode={"outlined"}
      //style={{flex: 1, paddingVertical: 200, paddingHorizontal: 50, height: 200, width: 400}}
     
      style={{flex: 0.5, paddingHorizontal: 50, justifyContent: 'flex-start', fontSize: 20}}
      placeholder={"Skriv här"}
      multiline={true}
     
     
      
    />
      </View>
      <View style={{ flex: 0.3, paddingBottom: 60, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
        <CircleButton icon="close" size={40} onPress={() => console.log("pressedIcon")} />
        <CircleButton icon="check" size={40} onPress={() => console.log("pressedIcon")} />
           
      </View>

     </View>

  )
}
  



const CareerView = () => (
  <View style={{ flex: 1}}>
    <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{fontSize: 30}}>Karriär</Title>
    </View>
    <ScrollView>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>
      <Text style={{ fontSize: 80 }}>React Native</Text>

    </ScrollView>
    <FAB
      style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      }}
      icon="pencil"
      onPress={() => console.log('Pressed fab')}
    />
  </View>
); 

const InterestsView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
  <View style={{flex: 1}}>
  <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Stöd</Text>
  </View>
  </View>
);


const StyledButton = (props: any) => {
  return (
    
      <Button theme={{ roundness: 30 }} contentStyle={{width: 240, height: 70}} compact={true} mode="outlined" onPress={props.function}>
        <Text>{props.name}</Text>
      </Button>
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
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <CreateButton name={lang.valuesButtonRelationships} function={relationButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <CreateButton name={lang.valuesButtonCareer} function={careerButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <CreateButton name={lang.valuesButtonInterests} function={interestsButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <CreateButton name={lang.valuesButtonMind} function={mindButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <CreateButton name={lang.valuesButtonResponsibility} function={responsibilityButton}/>
    </View>
    <View style={{flex: 0.02, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <CreateButton name={lang.valuesButtonSupport} function={supportButton}/>
    </View>
    
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
