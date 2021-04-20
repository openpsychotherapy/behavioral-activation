import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Title, Button, TextInput, FAB, IconButton, Surface} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { useTranslation } from 'language/LanguageProvider';

import Storage from 'storage';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const ValuesStack = createStackNavigator();



const YesNoButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
  }

const TopicTextInputView = ({route, navigation}: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  //const { name } = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Title style={{fontSize: 30}}>inget</Title>
      </View>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
      <TextInput
      value={text}
      onChangeText={setText}
      mode={"outlined"}
     
      style={{flex: 0.5, paddingHorizontal: 50, justifyContent: 'flex-start', fontSize: 20}}
      placeholder={"Skriv här"}
      multiline={true}
     
     
      
    />
      </View>
      <View style={{ flex: 0.3, paddingBottom: 60, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
        <YesNoButton icon="close" size={40} onPress={() => console.log("pressedIcon")} />
        <YesNoButton icon="check" size={40} onPress={() =>{
          navigation.navigate({
            name: 'Career',
            //params: { post: text},
            //merge: true,
          },

          );
          modifyValues.addTopic("work", text);
        } } />
           
      </View>

     </View>

  )
}



const CareerView = ({navigation, route}: any) => {
  const [values, modifyValues] = Storage.useValues();
  console.log(values.work[0].name)
 
  
  React.useEffect(() => {
    if (route.params?.post) {

    }

  }, [route.params?.post]);

  return (
    <View style={{ flex: 1}}>
    <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{fontSize: 30}}>Karriär</Title>
    </View>
    <ScrollView>
      <Text>Post: {route.params?.post}</Text>
    </ScrollView>
    <FAB
      style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      }}
      icon="pencil"
      onPress={() => 
        navigation.navigate('TopicTextInputView')
      }
    />
    

  </View>
  );
  
}

const TopicView = ({route, navigation}: any) => {

  const { name } = route.params;

  return (
    <View style={{ flex: 1}}>
    <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{fontSize: 30}}>{name}</Title>
    </View>
    <ScrollView>
    </ScrollView>
    <FAB
      style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      }}
      icon="pencil"
      onPress={() => {
        navigation.navigate('TopicTextInputView', {
          name: name,
        });
      }}
    />
  </View>
  );
}


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


  
const StartScreenView = ({navigation}: any) => {

  const lang = useTranslation();
  
  const relationButton = () => {
    navigation.navigate('Relation', {
      name: 'Relation'
    });
  };

  const careerButton = () => {
    navigation.navigate('Career');
  };

  const interestsButton = () => {
    navigation.navigate('Interests', {
      name: 'Fritid/intressen'
    });
  };

  const mindButton = () => {
    navigation.navigate('Mind', {
      name: 'Sinne/Kropp/Spirituellt'
    });
  };

  const responsibilityButton = () => {
    navigation.navigate('Responsibility', {
      name: 'Dagliga ansvar'
    });
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
      <StyledButton name={lang.valuesButtonRelationships} function={relationButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonCareer} function={careerButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonInterests} function={interestsButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonMind} function={mindButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonResponsibility} function={responsibilityButton}/>
    </View>
    <View style={{flex: 0.02, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonSupport} function={supportButton}/>
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
      
      <ValuesStack.Screen name= "StartScreenView" component= {StartScreenView} />
      <ValuesStack.Screen name="Relation" component={TopicView} />
      <ValuesStack.Screen name="Career" component={CareerView} />
      <ValuesStack.Screen name="Interests" component={TopicView} />
      <ValuesStack.Screen name="Mind" component={TopicView} />
      <ValuesStack.Screen name="Responsibility" component={TopicView} />
      <ValuesStack.Screen name="Support" component={SupportView} />

      <ValuesStack.Screen name="TopicTextInputView" component={TopicTextInputView}/>

    </ValuesStack.Navigator>
  );
}
