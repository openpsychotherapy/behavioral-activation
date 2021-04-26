import React, {useEffect, useState} from 'react';
import { View, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Title, Button, TextInput, FAB, IconButton, Surface, useTheme, Portal, Dialog, Paragraph} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { ValuesTopic, People, ValuesEntry } from 'storage/types';
import { IconMeny } from './IconMeny';
import { IconList } from './IconList';
import { useLinkProps } from '@react-navigation/native';

const ValuesStack = createStackNavigator();

const RoundButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
  }
  
const CircleButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3, backgroundColor: props.backgroundColor }}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
}

//Button that deletes topics, persons or entities
const DeleteButton = (props: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const lang = useTranslation();
  const deleteElement = () => {
    switch(props.itemToDelete){
      case "topic":
        modifyValues.deleteTopic(props.category, props.topic);
        break;
      case "entry":
        modifyValues.deleteEntry(props.category, props.topic, props.entry);
        break;
      case "person":
        modifyPeople.deletePerson(props.person);
        break;
    }
    hideDialog();  
  }

  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={"close"} onPress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>{lang.valuesDialogText}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              {lang.valuesDialogNo}
            </Button>
            <Button onPress={deleteElement}>{lang.valuesDialogYes}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface >
  )
}

//Template for buttons used
const StyledButton = (props: any) => {
  return (
    <Button style={{width: "80%", height: "80%"}} contentStyle={{width: "100%",height: "100%", justifyContent: 'center', alignItems: 'center'}} theme={{ roundness: 30 }}  
    compact={true} mode="outlined" onPress={props.categoryButton}>
      <Text>{props.name}</Text>
    </Button>
  )
}

const EntryButton = (props: any) => {
  return (
    <Button theme={{ roundness: 30 }} contentStyle={{width: "100%", height: "100%", flexDirection: 'row', justifyContent: 'center'}} 
    compact={true} mode="outlined" onPress={props.categoryButton} icon={props.icon}>
      <Text>{props.name}</Text>
    </Button>
  )
}

//View for adding entry
const addEntryView = ({route, navigation}: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const [people, modifyPeople] = Storage.usePeople();
  const { title, navigateBack, categoryString, icon } = route.params;
  const lang = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
      <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Surface style={{ borderRadius: 100, elevation: 3}}>
          <IconButton icon={icon} />
        </Surface > 
      <View style={{ width: "5%", height: "5%" }} />
        <Title>{title}</Title>
        
      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        <TextInput
          value={text}
          onChangeText={setText}
          mode={"outlined"} 
          style={{paddingHorizontal: "15%"}}
          placeholder={lang.valuesPlaceholder}
          multiline={true} />
      </View>
      <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RoundButton icon="close" onPress={() => {
            navigation.navigate({
              name: 'EntryView'
            })
          }} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RoundButton icon="check" onPress={() =>{
            navigation.navigate({
              name: 'EntryView',
            },);
            
              modifyValues.addEntry(categoryString, title, {
                icon: icon,
                text: text,
              })
            }} />  
        </View>  
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

//Icon view
const chooseEntryIconView = ({route, navigation}: any) => {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();
  const {title, navigateBack, categoryString} = route.params;

  const iconPressCallback = (pressedIcon: Number, icon: String) => {
    navigation.navigate('addEntryView', {
      title: title,
      navigateBack: navigateBack,
      categoryString: categoryString,
      icon: icon,
    });
  };

  const iconListButton = () => {
    setVisible(true);
  };

  return(
    <View style={{flex: 1}}>
      <IconList pressCallback={iconPressCallback} visible={visible} setVisible={setVisible} />
      <IconMeny pressCallback={iconPressCallback} />

      <View style={{ paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <CircleButton icon='menu' size={40} backgroundColor={colors.accent} onPress={iconListButton} />
      </View>
    </View>

  )
}

//View for entries
const EntryView = ({route, navigation}: any) => {
  const {title, navigateBack, categoryString} = route.params;
  const [values, modifyValues] = Storage.useValues();
  let index: number;
  let category: any;

  useEffect(() => {
    content
  }, [values])

  category = values[categoryString];
  index = values[categoryString].findIndex(t => t.name === title);
  //Creates all the entries for the right topic
  const content = category[index].entries.map((entry: ValuesEntry) => 
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <EntryButton name={entry.text} categoryButton={null} icon={entry.icon}/>
        <View style={{ width: 10, height: 10 }} />
        <DeleteButton category= {categoryString} topic={category[index].name} entry={entry} itemToDelete="entry"/>
        </View>
      <View style={{ width: 20, height: 20 }} />
    </> 
  );

  return(
    <View style={{ flex: 1}}>
      <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
        <Title>{title}</Title>
      </View>
      <ScrollView style={{flex: 0.8}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {content}
        </View>
      </ScrollView>
      <FAB
        style={{
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
        }}
        icon="pencil"
        onPress={() => {
          navigation.navigate('chooseEntryIconView', {
            title: title,
            navigateBack: navigateBack,
            categoryString: categoryString
          });
        }}
      />
  </View>
  )
}

//View when adding a new topic
const AddTopicView = ({route, navigation}: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const [people, modifyPeople] = Storage.usePeople();
  const { title, navigateBack, categoryString } = route.params;
  const lang = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Title>{title}</Title>
      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        <TextInput
        value={text}
        onChangeText={setText}
        mode={"outlined"} 
        style={{paddingHorizontal: "15%"}}
        placeholder={lang.valuesPlaceholder}
        multiline={true}
       />
      </View>
      <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RoundButton icon="close" onPress={() => {
            navigation.navigate({
              name: navigateBack
            })
          }} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RoundButton icon="check" onPress={() =>{
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
     </View>
    </TouchableWithoutFeedback>
    
  )
}

//View for each category
const CategoryView = ({route, navigation}: any) => {
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

  if(categoryString != 'people'){
    category = values[categoryString];
  }else{
    category = people;
  }
  
  //creates a list of buttons with the right topic in the right category
  const buttons = category.map((topic: ValuesTopic) => 
    <>
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Button style={{width: "70%", height: "90%"}} theme={{ roundness: 30 }} contentStyle={{width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center'}} 
      compact={true} mode="outlined" onPress={() => {
      navigation.navigate('EntryView', {
        title: topic.name,
        navigateBack: navigateBack,
        categoryString: categoryString
      });
    }}>
        <Text>{topic.name}</Text>
      </Button>
      <View style={{ width: "5%", height: "5%" }} />
      <DeleteButton category= {categoryString} topic={topic.name} itemToDelete = "topic" />
    </View>
    <View style={{ width: 20, height: 20 }} />
    
    </> 
  );

  //create a list of text boxes for people
  const textBoxes = category.map((person: People) =>    
    <>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <StyledButton name={person} categoryButton={null}/>
      <View style={{ width: 10, height: 10 }} />
      <DeleteButton category= {categoryString} person={person} itemToDelete = "person" />
      </View>
    <View style={{ width: 20, height: 20 }} />
    
    </> 
  );

  //Decides what to show in the scrollview
  if(categoryString != 'people'){
    content = buttons;
  }
  else{
    content = textBoxes;
  }
  return (
    <View style={{ flex: 1}}>
      <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
        <Title>{title}</Title>
      </View>
      <View style={{ width: "5%", height: "5%"}} />
      <ScrollView style={{flex: 1}}>

        {content}

      </ScrollView>
      <FAB
        style={{
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
        }}
        icon="pencil"
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

//View for the first screen in values 
const StartScreenView = ({navigation}: any) => {
  const lang = useTranslation();
  
  const relationsButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonRelations,
      navigateBack: 'CategoryView',
      categoryString: 'relations',
    });
  };

  const workButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonWork,
      navigateBack: 'CategoryView',
      categoryString: "work",
    });
  };

  const enjoymentButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonEnjoyment,
      navigateBack: 'CategoryView',
      categoryString: 'enjoyment',
    });
  };

  const healthButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonHealth,
      navigateBack: 'CategoryView',
      categoryString: 'health',
    });
  };

  const responsibilitiesButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonResponsibilities,
      navigateBack: 'CategoryView',
      categoryString: 'responsibilities',
    });
  };

  const peopleButton = () => {
    navigation.navigate('CategoryView', {
      title: lang.valuesButtonPeople,
      navigateBack: 'CategoryView',
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
      <ValuesStack.Screen name="CategoryView" component={CategoryView} />
      <ValuesStack.Screen name="AddTopicView" component={AddTopicView}/>
      <ValuesStack.Screen name="EntryView" component={EntryView}/>
      <ValuesStack.Screen name="chooseEntryIconView" component={chooseEntryIconView}/>
      <ValuesStack.Screen name="addEntryView" component={addEntryView}/>


    </ValuesStack.Navigator>
  );
}
