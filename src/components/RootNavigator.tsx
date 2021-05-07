import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ActivityScreen } from './ActivityScreen';
import { ValuesScreen } from './ValuesScreen';
import { CalendarScreen } from './CalendarScreen';
import { InformationScreen } from './InformationScreen';

const Tab = createMaterialBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Activity' shifting={true} sceneAnimationEnabled={false} labeled={false}>
      <Tab.Screen name='Activites' component={ActivityScreen} options={{ tabBarIcon: 'plus' }} />
      <Tab.Screen name='Values' component={ValuesScreen} options={{ tabBarIcon: 'heart' }} />
      <Tab.Screen name='Calendar' component={CalendarScreen} options={{ tabBarIcon: 'calendar' }} />
      <Tab.Screen name='Information' component={InformationScreen} options={{ tabBarIcon: 'information' }} />
    </Tab.Navigator>
  );
}
