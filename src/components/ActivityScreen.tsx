import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';

const ActivityStack = createStackNavigator();

// TEMPORARY TEST CODE - START
// Will be modified before merge.
function DepthViewContent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TestScreen</Text>
    </View>
  );
}

function ViewContent({ navigation }: any) {

  const [previous, setPrevious] = useState(false);

  function changeScreen() {
    setPrevious(true);
    navigation.navigate("TestScreen");
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{previous}</Text>
        <Button icon='airballoon' mode='outlined' onPress={changeScreen}>Test</Button>
      </View>
    </View>
  );
}
// TEMPORARY TEST CODE - END

export function ActivityScreen({ navigation }: any) { // TODO: Work out how to work with typing for hard to specify types.
  return (
    <View style={{ flex: 1 }}>
      <ActivityStack.Navigator initialRouteName="Activities" headerMode="float"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <ActivityStack.Screen name="Activities" component={ViewContent} />
        <ActivityStack.Screen name="TestScreen" component={DepthViewContent} />
      </ActivityStack.Navigator>
    </View>
  );
}