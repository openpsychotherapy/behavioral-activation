import React from 'react';
import { View } from 'react-native';
import { Surface, IconButton, useTheme, Snackbar } from 'react-native-paper';

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { SettingsScreen } from './SettingsScreen';

import { IconMeny } from './IconMeny';
import { IconList } from './activity/IconList';
import { ActivityRegistrator } from './activity/ActivityRegistrator';
import { ActivityHistory } from './activity/ActivityHistory';
import { ActivityRateDay } from './activity/ActivityRateDay';
import { ActivityWeekHistory } from './activity/ActivityWeekHistory';
import { ActivityPlanning } from './activity/ActivityPlanning';
import { ActivityPlanningRate} from './activity/ActivityPlanningRate';

import { useTranslation } from 'language/LanguageProvider';

const ActivityStack = createStackNavigator();


const CircleButton = (props: any) => {
  const { elevation } = useTheme();
  return (
    <Surface style={{ borderRadius: 100, elevation: elevation.small, backgroundColor: props.backgroundColor }}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
}

const ViewContent = ({ route, navigation }: any) => {
  const { colors, iconSizes } = useTheme();

  const lang = useTranslation();

  const [iconListVisible, setIconListVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);

  // Trigger snackbar to show once
  if (route.params.activityRegistered) {
    setSnackBarVisible(true);
    route.params.activityRegistered = false;
  }

  const iconListButton = () => {
    setIconListVisible(true);
  };

  const historyButton = () => {
    navigation.navigate('History');
  };

  const registerPlanningButton = () => {
    navigation.navigate("RegisterPlanning")
  }

  const iconPressCallback = (pressedIcon: Number, icon: String) => {
    setIconListVisible(false);
    navigation.push('ActivityRegistration', { pressedIcon: pressedIcon, icon: icon });
  };

  return (
    <View style={{ flex: 1 }}>
      <IconList pressCallback={iconPressCallback} visible={iconListVisible} setVisible={setIconListVisible} />
      <IconMeny pressCallback={iconPressCallback} />

      <View style={{ paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <CircleButton icon='menu' size={iconSizes.medium} backgroundColor={colors.accent} onPress={iconListButton} />
        <CircleButton icon='calendar-multiple-check' size={iconSizes.medium} backgroundColor={colors.accent}/>
        <CircleButton icon='calendar-clock' size={iconSizes.medium} backgroundColor={colors.accent} onPress={historyButton} />
      </View>

      <Snackbar visible={snackBarVisible} onDismiss={()=>{setSnackBarVisible(false)}} duration={4000} >
        {lang.activiesSnackBarAdded}
      </Snackbar>
    </View>
  );
}

export const ActivityScreen = ({ navigation }: any) => {
  return (
    <ActivityStack.Navigator initialRouteName='Activities' headerMode='float'
      screenOptions={{
        header: (props: StackHeaderProps) => <CustomNavigationBar {...props} />,
      }}
    >
      <ActivityStack.Screen name='Activities' component={ViewContent} initialParams={{activityRegistered: false}} />
      <ActivityStack.Screen name='History' component={ActivityHistory} initialParams={{currentDay: -1}} />
      <ActivityStack.Screen name='ActivityRegistration' component={ActivityRegistrator} />
      <ActivityStack.Screen name='Settings' component={SettingsScreen} />
      <ActivityStack.Screen name='RateDay' component={ActivityRateDay} />
      <ActivityStack.Screen name='WeekHistory' component={ActivityWeekHistory} />
      <ActivityStack.Screen name='RegisterPlanning' component={ActivityPlanning} />
      <ActivityStack.Screen name='RegisterPlanningRate' component={ActivityPlanningRate} />
    </ActivityStack.Navigator>
  );
}
