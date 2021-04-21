import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Title, Button, TextInput, FAB, IconButton, Surface} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { ValuesTopic, People } from 'storage/types';
 
const ValuesStack = createStackNavigator();

const RoundButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
  }

//Button that deletes topics and persons
const DeleteButton = (props: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={"close"} size={40} onPress={()=> {
        modifyValues.deleteTopic(props.category, props.name);
        modifyPeople.deletePerson(props.name);
      }
        } />
    </Surface >

  )
}

//Template for buttons used
const StyledButton = (props: any) => {
  return (
    
      <Button theme={{ roundness: 30 }} contentStyle={{width: 240, height: 70}} compact={true} mode="outlined" onPress={props.categoryButton}>
        <Text>{props.name}</Text>
      </Button>
  )
}

//View when adding a new topic
const TopicTextInputView = ({route, navigation}: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const [people, modifyPeople] = Storage.usePeople();
  const { title, navigateBack, categoryString } = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Title style={{fontSize: 30}}>{title}</Title>
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
        <RoundButton icon="close" size={40} onPress={() => {
          navigation.navigate({
            name: navigateBack
          })
        }} />
        <RoundButton icon="check" size={40} onPress={() =>{
          navigation.navigate({
            name: navigateBack,
          },);
          if(categoryString != 'people'){
            modifyValues.addTopic(categoryString, text);
          }
          else{
            modifyPeople.add(text);
          }

        } } />  
      </View>
     </View>
  )
}

//View for each topic
const TopicView = ({route, navigation}: any) => {
  const { title, navigateBack, categoryString} = route.params;
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  let category: any;
  let buttonText: any;
  let content: any;
  
  //Create buttons to each topic whenever we add or delete a topic
  useEffect(() => {
    buttons
  }, [values])

  //Create text boxes to people whenever we add or delete a people
  useEffect(() => {
    textBoxes
  }, [people])

  //To find the right category
  switch(categoryString){
    case "relations":
      category = values.relations;
      break;
    case "work":
      category = values.work;
      break;
    case "health":
      category = values.health;
      break;
    case "enjoyment":
      category = values.enjoyment;
      break;
    case "responsibilities":
      category = values.responsibilities;
      break;
    case "people":
      category = people;
      break;
    //Category needs to be set to something
    default:
      category = values.relations;

  }
  //creates a list of buttons with the right topic in the right category
  const buttons = category.map((topic: ValuesTopic) => 
      <>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <StyledButton name={topic.name} categoryButton={null}/>
      <View style={{ width: 10, height: 10 }} />
      <DeleteButton category= {categoryString} name={topic.name}/>
      </View>
      <View style={{ width: 20, height: 20 }} />
      
      </> 
  );

  //create a list of text boxes for people
  const textBoxes = category.map((person: People) =>    
  <>
  <View style={{flex: 1, flexDirection: 'row'}}>
  <StyledButton name={person} categoryButton={console.log('pressed')}/>
  <View style={{ width: 10, height: 10 }} />
  <DeleteButton category= {categoryString} name={person}/>
  </View>
  <View style={{ width: 20, height: 20 }} />
  
  </> 
  );
    if(categoryString!='people'){
      content=buttons;
    }
    else{
      content=textBoxes;
    }
  return (
    <View style={{ flex: 1}}>
    <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{fontSize: 30}}>{title}</Title>
    </View>
    <ScrollView style={{flex: 0.8}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {content}
      </View>
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
          title: title,
          navigateBack: navigateBack,
          categoryString: categoryString
        });
      }}
    />
  </View>
  );
}



 //View for the first screen in values 
const StartScreenView = ({navigation}: any) => {
  const lang = useTranslation();
  
  const relationsButton = () => {
    navigation.navigate('Relations', {
      title: lang.valuesButtonRelations,
      navigateBack: 'Relations',
      categoryString: 'relations',
    });
  };

  const workButton = () => {
    navigation.navigate('Work', {
      title: lang.valuesButtonWork,
      navigateBack: 'Work',
      categoryString: "work",
    });
  };

  const enjoymentButton = () => {
    navigation.navigate('Enjoyment', {
      title: lang.valuesButtonEnjoyment,
      navigateBack: 'Enjoyment',
      categoryString: 'enjoyment',
    });
  };

  const healthButton = () => {
    navigation.navigate('Health', {
      title: lang.valuesButtonHealth,
      navigateBack: 'Health',
      categoryString: 'health',
    });
  };

  const responsibilitiesButton = () => {
    navigation.navigate('Responsibilities', {
      title: lang.valuesButtonResponsibilities,
      navigateBack: 'Responsibilities',
      categoryString: 'responsibilities',
    });
  };

  const peopleButton = () => {
    navigation.navigate('People', {
      title: lang.valuesButtonPeople,
      navigateBack: 'People',
      categoryString: 'people',

    });
  };

  return (
    <View style={{flex: 1}}>
    <View style={{flex: 0.10, alignItems: 'center', justifyContent: 'center'}}>
      <Title>{lang.valuesHeaderEvaluation}</Title>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonRelations} categoryButton={relationsButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonWork} categoryButton={workButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonEnjoyment} categoryButton={enjoymentButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonHealth} categoryButton={healthButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonResponsibilities} categoryButton={responsibilitiesButton}/>
    </View>
    <View style={{flex: 0.02, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonPeople} categoryButton={peopleButton}/>
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
      <ValuesStack.Screen name="StartScreenView" component= {StartScreenView} />
      <ValuesStack.Screen name="Relations" component={TopicView} />
      <ValuesStack.Screen name="Work" component={TopicView} />
      <ValuesStack.Screen name="Enjoyment" component={TopicView} />
      <ValuesStack.Screen name="Health" component={TopicView} />
      <ValuesStack.Screen name="Responsibilities" component={TopicView} />
      <ValuesStack.Screen name="People" component={TopicView} />

      <ValuesStack.Screen name="TopicTextInputView" component={TopicTextInputView}/>

    </ValuesStack.Navigator>
  );
}
