import React from 'react';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ActivityScreen } from './ActivityScreen';
import { ValuesScreen } from './ValuesScreen';
import { CalendarScreen } from './CalendarScreen';
import { InformationScreen } from './InformationScreen';
import { useTranslation } from 'language/LanguageProvider';

const Tab = createMaterialBottomTabNavigator();

export const RootNavigator = () => {
  const lang = useTranslation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator initialRouteName='Activity' shifting={true} sceneAnimationEnabled={false} labeled={true} barStyle={{backgroundColor: colors.primary}} >
      <Tab.Screen name='Activites' component={ActivityScreen} options={{ tabBarIcon: 'plus', title: lang.navigationLabelActivites  }} />
      <Tab.Screen name='Values' component={ValuesScreen} options={{ tabBarIcon: 'heart', title: lang.navigationLabelValues }} />
      <Tab.Screen name='Calendar' component={CalendarScreen} options={{ tabBarIcon: 'calendar', title: lang.navigationLabelCalendar }} />
      <Tab.Screen name='Information' component={InformationScreen} options={{ tabBarIcon: 'information', title: lang.navigationLabelInformation}} />
    </Tab.Navigator>
  );
}
