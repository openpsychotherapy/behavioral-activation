import React from 'react';
import { View } from 'react-native';
import { Text, Surface, IconButton, useTheme, Snackbar } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { SettingsScreen } from './SettingsScreen';

import { IconMeny } from './IconMeny';
import { IconList } from './activity/IconList';
import { ActivityRegistrator } from './activity/ActivityRegistrator';

import { useTranslation } from 'language/LanguageProvider';

const ActivityStack = createStackNavigator();

const HistoryView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>History</Text>
  </View>
);

const CircleButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3, backgroundColor: props.backgroundColor }}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
}

const ViewContent = ({ route, navigation }: any) => {
  const { colors } = useTheme();

  const lang = useTranslation();

  const [iconListVisible, setIconListVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);

  const navigationButtonSize = 40;

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

  const iconPressCallback = (pressedIcon: Number, icon: String) => {
    setIconListVisible(false);
    navigation.push('ActivityRegistration', { pressedIcon: pressedIcon, icon: icon });
  };

  return (
    <View style={{ flex: 1 }}>
      <IconList pressCallback={iconPressCallback} visible={iconListVisible} setVisible={setIconListVisible} />
      <IconMeny pressCallback={iconPressCallback} />

      <View style={{ paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <CircleButton icon='menu' size={navigationButtonSize} backgroundColor={colors.accent} onPress={iconListButton} />
        <CircleButton icon='calendar-check' size={navigationButtonSize} backgroundColor={colors.accent} />
        <CircleButton icon='clock-fast' size={navigationButtonSize} backgroundColor={colors.accent} onPress={historyButton} />
      </View>

      <Snackbar visible={snackBarVisible} onDismiss={()=>{setSnackBarVisible(false)}} duration={4000} >
        {lang.activiesSnackBarAdded}
      </Snackbar>
    </View>
  );
}

export const ActivityScreen = ({ navigation }: any) => {
  return (
    <ActivityStack.Navigator initialRouteName="Activities" headerMode="float"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <ActivityStack.Screen name="Activities" component={ViewContent} initialParams={{activityRegistered: false}} />
      <ActivityStack.Screen name="History" component={HistoryView} />
      <ActivityStack.Screen name="ActivityRegistration" component={ActivityRegistrator} />
      <ActivityStack.Screen name="Settings" component={SettingsScreen} />
    </ActivityStack.Navigator>
  );
}
